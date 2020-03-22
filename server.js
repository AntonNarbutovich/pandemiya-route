const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('dotenv').config();
const cors = require('cors');

const port = 8000;

app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.use('/', require('./route'));

app.listen(port, () => {
    console.log('Running on ' + port);
}); 


