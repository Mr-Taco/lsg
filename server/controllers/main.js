'use strict';

let response = require('../utilities/response');

module.exports.index = (req, res) => {
    response.view(res, 'index');
};