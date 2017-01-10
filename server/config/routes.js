let express = require('express');
let main = require('../controllers/main');
let subscribers = require('../controllers/subscribers');
let proxy = require('express-http-proxy');
let url = require('url');


module.exports = function(app) {

	app.use(express.static('public'));

	let api_url = process.env.API_URL; 

	app.get('/api/*', proxy(api_url, {
		forwardPath: function(req, res){
			return url.parse(req.originalUrl).path.replace("/api", "");
		}
	}));

	app.post('/api/*', proxy(api_url, {
		forwardPath: function(req, res){
			return url.parse(req.originalUrl).path.replace("/api", "");
		}
	}));

	app.post('/subscribers', subscribers.add_subscriber);
	app.get('*', main.index);
};
