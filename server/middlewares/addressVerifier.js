const _ = require('lodash');
const {addressFromLonLat, addressFromAddress} = require('../services/addressGetter');
const errorHandler = require('../services/errorHandler');

module.exports = (req, res, next) => {
    const requestPromises = [];

    req.filteredItems.forEach( (item) => {
        const { formattedAddress, lon, lat } = item;

        if (lon && lat) {
            // The longitude and lattitude were provided in the request
            // so attempt to get the actual address using the longitude
            // and lattitude and push the pending request promise in to
            // the array.
            requestPromises.push( addressFromLonLat(lon, lat) );
        }
        else {
            // Address fields were provided in the request so attempt
            // to get this address and push the pending request promise in to
            // the array.
            requestPromises.push( addressFromAddress(formattedAddress) );
        }
    });

    Promise.all(requestPromises).then( (addresses) => {

        // All the addresses provided in the request were valid so
        // loop through them  and 
        for (let i = 0; i < addresses.length; i++) {
            let concataddress = addresses[i];

            // Google maps API results will have 'Australia' at the 
            // end of the address line for Australian address. We can
            // remove it.
            concataddress = _.replace(concataddress, 'Australia', '');

            // Trim white spaces.
            concataddress = _.trim(concataddress);

            // Trim any left over commas at the end.
            concataddress = _.trim(concataddress, ',');

            req.filteredItems[i].concataddress = concataddress;
        }

        next();
    }).catch( error => {
        // The address request promise was rejected which means one or more of the
        // addresses in the request were not found with Google Maps API. So we send 
        // an error to the user.
        return errorHandler(res);
    });
}