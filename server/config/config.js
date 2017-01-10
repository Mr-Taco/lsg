'use strict';

let env = require('./env');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let path = require('path');
let favicon = require('serve-favicon');

// let mobileDetect = require('../middleware/mobileDetect');
let webpackMiddleware = require('../middleware/webpack');

module.exports = app => {
    //Set the absolute app dir up tp the location of express.js (eg.. /Users/name/Projects/thisproject/)
    let appDir = path.dirname(require.main.filename);

    app.set('appDir', appDir);
    app.set('views', appDir + '/server/view');
    app.set('view engine', 'jade');

    app.use(logger('dev', {skip: (req, res) => { return res.statusCode < 399; }}));
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(cookieParser());

    app.enable('trust proxy');


    if (env.NODE_ENV === 'development') webpackMiddleware(app);
};

