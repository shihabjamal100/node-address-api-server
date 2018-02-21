const axios = require('axios');

const ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

const addressFromUrl = async (url) => {
    const res = await axios.get(url);

    if (res.status == 200 && res.data.results.length !== 0) {
        // The address provided in the URL has been found.
        return res.data.results[0].formatted_address;
    }

    // The address was not found.
    return Promise.reject();
}

const addressFromLonLat = (lon, lat) => {
    // Use Google Maps API to determine the actual address
    // from the longitude and lattitude and return a promise.
    const url = `${ROOT_URL}latlng=${lat},${lon}`;
    return addressFromUrl(url);
}

const addressFromAddress = (address) => {
    // Use Google Maps API to look up the actual address
    // from the address provided and return a promise.
    const url = `${ROOT_URL}address=${encodeURIComponent(address)}`;
    return addressFromUrl(url);
}

module.exports = {
    addressFromLonLat,
    addressFromAddress
}