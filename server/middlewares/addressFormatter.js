const _ = require('lodash');

module.exports = (req, res, next) => {
    req.filteredItems.forEach(item => {
        // Destructure out these address components from the keys in the address object
        const { unitNumber, buildingNumber, street, suburb, state, postcode, lon, lat } = item.address;

        // Construct the address string in this format.
        let formattedAddress = `${unitNumber} ${buildingNumber} ${street}  ${suburb} ${state} ${postcode}`;
        
        // If any of the address components were not found in the address object keys then
        // they will show up as 'undefined' in the string so remove all occurrences of
        // undefined from the string.
        formattedAddress = _.replace(formattedAddress, 'undefined', '');

        // Trim any white spaces.
        formattedAddress = _.trim(formattedAddress);

        item.formattedAddress = formattedAddress;

        // Longitude and lattitude may be undefined if they are not found in the address object.
        item.lon = lon;
        item.lat = lat;
    });

    next();
}