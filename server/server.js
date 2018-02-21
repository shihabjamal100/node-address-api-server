const express = require('express');
const bodyParser = require('body-parser');

const errorHandler = require('./services/errorHandler');
require('./config/config');

const app = express();
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    if (err) {
      errorHandler(res);
    } 
    else {
      next();
    }
});

require('./routes/indexRoute')(app);

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`Started on port ${port}`);
});

module.exports.app = app;