let path = require('path');
let express = require('express');
let routes = require('./server/config/routes');
let bodyParser = require('body-parser')
let dotenv = require('dotenv');
dotenv.load();

let config = require('./server/config/config');
// let routes = require('./server/config/routes');

process.setMaxListeners(0);


let app = express();

config(app);
routes(app);


let port =  process.env.PORT || 3001;

let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Listening to your shit at http://%s:%s', host, port ); 
});