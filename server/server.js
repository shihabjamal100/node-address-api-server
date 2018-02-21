const express = require('express');
const bodyParser = require('body-parser');
require('./config/config');

const app = express();
app.use(bodyParser.json())

require('./routes/indexRoute')(app);

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`Started on port ${port}`);
});