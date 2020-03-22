const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config =  require('dotenv').config();

const port = 8000;

app.use('/', require('./route'));

app.listen(port, () => {
    console.log('Running on ' + port);
}); 


