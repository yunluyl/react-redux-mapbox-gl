var prompt = require('prompt');
var fs = require('fs');

try
{
	var existingMapToken = require('./mapToken');
}
catch (e)
{
	var schema =
	{
		properties :
		{
			mapToken :
			{
				description : 'Please enter your Mapbox access token',
				pattern : /^\S+$/,
				type : 'string',
				message : 'Mapbox token must not contain whitespace characters',
				required : true
			}
		}
	};
	prompt.start();

	prompt.get(schema, function(err, result)
	{
		if (err)
		{
			console.log(err);
		}
		else
		{
			fs.writeFile('./test/mapToken.js', "module.exports = '" + result.mapToken + "';");
		}
	});
}