module.exports = (res) => {
    res.status(400).send( {
        error: 'Could not decode request: JSON parsing failed'
    });
}