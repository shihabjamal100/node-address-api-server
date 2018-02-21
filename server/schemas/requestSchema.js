// Schema for the request JSON. The request JSON must
// at least have the properties shown.
module.exports = {
                     "type": "object", 
                     "properties": { 
                         "address": {"type": "object"},
                         "type": {"type": "string"},
                         "workflow": {"type": "string"} }, 
                     "required": ["address", "type", "workflow"]
};