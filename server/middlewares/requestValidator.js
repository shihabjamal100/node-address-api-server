const {Validator} = require('jsonschema');
const schema = require('../schemas/requestSchema');
const errorHandler = require('../services/errorHandler');

var validator = new Validator();

module.exports = (req, res, next) => {
    // The payload must be an array. If not send an
    // error back to the user.
    if (!Array.isArray(req.body.payload)) {
        return errorHandler(res);
    }

    try {
        // Loop through all the items in the payload array and
        // ensure that they contain the properties stipulated in
        // the schema
        req.body.payload.forEach(element => {
            if (validator.validate(element, schema).errors.length != 0) {
                throw new Error();
            }
        });
    }
    catch(e) {
        return errorHandler(res);
    }

    next();
}