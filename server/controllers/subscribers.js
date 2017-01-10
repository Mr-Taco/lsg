var request = require('request');

module.exports.add_subscriber = function (req,res) {
	var email_address = req.query.email_address;
	var first_name = req.query.first_name;
	var last_name = req.query.last_name;

	request({
		url: 'http://us14.api.mailchimp.com/3.0/lists/4ce6cda257/members/', //URL to hit
		method: 'POST',
		headers: {
			'Authorization': 'Elise ' + process.env.MAILCHIMP_KEY,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email_address: email_address, 
			status: "subscribed",
			merge_fields: {
				"FNAME": first_name,
				"LNAME": last_name
			}
		}),

	}, function(error, response, body){
		if(error) {
			console.log("in error");
			console.log(error);
			res.send(error);
		} else {
			console.log("in response");
			console.log(response.statusCode, body);
			res.send(body);
		}
	});
};

