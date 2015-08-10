//Problem: We need simple way to get zip code's weather summary and temperature
//Solution: Use Node.js to connect to forecast.io API to get forecast to print out
var https = require('https');

function printForecast(zip, summary, temperature) {
	var message = "Local forecast for today in the " + zip + " zip code is " + summary + " With a high of " + temperature + " degrees.";
	console.log(message);
}
//printForecast(92027, "Sunny", "70");

function printError(error) {
	console.error(error.message);
}

function get(apikey, zipcode, latitude, longitude) {
	//Connect to forecast.io API URL (https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE)
	var request = https.get('https://api.forecast.io/forecast/' + apikey + '/' + latitude + ',' + longitude, function(response) {
		//console.dir(response);
		var body = "";
		//Read the data
		response.on('data', function (chunk) {
			//console.log('BODY: ' + chunk);
			body += chunk;
		});
		//Print the data
		response.on('end', function () {
			//console.log(response.statusCode);
			if (response.statusCode === 200) {
				try {
				//Parse the data
					var forecast = JSON.parse(body);
					var forecastToday = forecast.daily.data[0];
					printForecast(zipcode, forecastToday.summary, forecastToday.temperatureMax);
				} catch(error) {
					printError(error);
				}
			} else {
				printError({message: "Weather ERROR"});
			}
		});
	});

	request.on('error', printError);
}

module.exports.get = get;
