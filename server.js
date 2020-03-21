const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

const port = 8000;

require('./route')(app);
app.listen(port, () => {
console.log('Running on ' + port);
}); 


