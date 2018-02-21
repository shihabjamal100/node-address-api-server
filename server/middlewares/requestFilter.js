module.exports = (req, res, next) => {
    // We only want the items in the payload that have a type of 'htv'
    // and a workflow of 'completed'
    const filteredItems = req.body.payload.filter( (item) => {
                                         return (item.type == 'htv' && item.workflow == 'completed');
                                        });
    req.filteredItems = filteredItems;
    next();
}