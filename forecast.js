var coordinates = require('./coordinates');
var weather = require('./weather');

var apikey = '86d6f346e465cee63200c8241f3b8aed';

var zips = process.argv.slice(2);

var forecast = function (zipcode){
	coordinates.get(zipcode, function(response){
		weather.get(apikey, zipcode, response.latitude, response.longitude);
	});
};

zips.forEach(forecast);