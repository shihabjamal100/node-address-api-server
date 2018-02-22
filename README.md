# node-address-api-server

This is a simple API server that can be used to filter out property information and verify addresses. The server handles post requests
in the following format:

{
    "payload": [
        {
            "address": {
                "buildingNumber": "28",
                "lat": -33.912542000000002,
                "lon": 151.00293199999999,
                "postcode": "2198",
                "state": "NSW",
                "street": "Donington Ave",
                "suburb": "Georges Hall"
            },
            "propertyTypeId": 3,
            "readyState": "init",
            "reference": "aqsdasd",
            "shortId": "6Laj49N3PiwZ",
            "status": 0,
            "type": "htv",
            "workflow": "completed"
        },
        {
            "address": {
                "buildingNumber": "Level 6",
                "postcode": "2060",
                "state": "NSW",
                "street": "146 Arthur Street",
                "suburb": "North Sydney"
            },
            "propertyTypeId": 3,
            "readyState": "init",
            "reference": "asdasd",
            "shortId": "E9eQVYEMkub2",
            "status": 4,
            "type": "other",
            "valfirm": null,
            "workflow": "pending"
        }
    ]
}

The server then filters out the elements in the array. The elements in the array having a "type" of "htv" and "workflow" of "completed"
are included in the response. In addition the server verifies that the addresses provided are valid by using Google Maps API. It then
finds concatenated addresses for each of the request arrays. The response to the aboove request should be the following:

{
    "response": [
        {
            "concataddress": "28 Donington Ave, Georges Hall NSW 2198",
            "type": "htv",
            "workflow": "completed"
        }
    ]
}

Addresses may be specified by the full address or by longitude and lattitude or both. The longitude and lattitude takes precedence in
verifying the addresses.

The server also handles errors if the request is invalid. The error response that is sent out is in the following format:

{
    "error": "Could not decode request: JSON parsing failed"
}

The error could be caused by the following conditions:

1. The request is in an invalid JSON format.
2. One or more of the elements in the request array do not have "type", "workflow" or "addresses" properties defined.
3. One or more of the elements in the request array have an invalid address - either invalid longitude/lattitude information or
   invalid address text. The longitude and lattitude take precedence.

If the all of the elements in the request array have valid addresses as well as "addresses" "type" and "workflow" defined, however
none of the "type" properties are "htv" and/or none of the "workflow" properties are "completed" then an empty response array will 
be sent like below:

{
    "response": []
}

Just POST the request data to the root route '/' to get the response.

Note that a Google Maps API key is used for this project and the file containing this, dev.js, is not committed to the repository.
If using for development, a Google Maps API key would be needed. This key should be placed in the server/config directory and should
be named dev.js.

The contents of the server/config/dev.js file should be in the following format:

module.exports = {
    googleApiKey: 'Enter_Your_Google_Maps_API_Key'
};
