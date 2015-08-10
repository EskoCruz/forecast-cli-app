//Problem: We need simple way to get zip code's latitude and longitude
//Solution: Use Node.js to connect to Google Maps API to get latitude and longitude to print out
var http = require('http');

function printError(error) {
	console.error(error.message);
}

function get(zipcode, callback) {
	//callback = {};
	//Connect to Google Maps API URL (http://maps.googleapis.com/maps/api/geocode/json?address={{ZIPCODE}})
	var request = http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode, function(response){
		//console.dir(response);
		var body = "";
		//Read the data
		response.on('data', function (chunk) {
			body += chunk;
		});
		//Parse the data
		response.on('end', function () {
			if (response.statusCode === 200){
				try{
					var geoData = JSON.parse(body);
					var location = geoData.results[0].geometry.location;
					var loc = {};
					loc.latitude = location.lat;
					loc.longitude = location.lng;
					return callback(loc);
				}
				catch(error){
					printError(error);
				}
			} else {
				printError({message: "Problem of Coordinate statusCode. (" + response.statusCode + ")"});
			}
		});
	});

	//Print the data

	request.on('error', function(error){
		console.error('Problem of error: ' + error.message);
	});
}

module.exports.get = get;