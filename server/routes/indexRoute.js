const _ = require('lodash');
const requestValidator = require('../middlewares/requestValidator');
const requestFilter = require('../middlewares/requestFilter');
const addressFormatter = require('../middlewares/addressFormatter');
const addressVerifier = require('../middlewares/addressVerifier');

module.exports = (app) => {
    app.post('/', requestValidator, requestFilter, addressFormatter, addressVerifier, (req, res) => {

        const result = {response: []};

        // We only want the concataddress, type and workflow in the 
        // response. The filteredItems object would be tacked on by the 
        // middleware chain.
        result.response = req.filteredItems.map( (item) => {
            const body = _.pick(item, ['concataddress', 'type', 'workflow']);
            return body;
        });

        res.send(result);
    });
}