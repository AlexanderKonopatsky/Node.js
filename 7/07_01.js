const express = require('express');
const bodyParser = require('body-parser');
let stat = require('./m07_01');

const HOST = 'localhost';
const PORT = 5000;
const app = express();

app.use(bodyParser.json());


let http_handler = (req, res) => {
    switch (req.method) {
        case 'GET' :{
            stat.Get_handler(req, res);
            break;
        }
        default: stat.HTTP404(req, res); 
            break;
    }
}

app.listen(PORT, HOST, () => {
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
}).on('request', http_handler);