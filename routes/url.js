var mongoose = require('mongoose');
var validator = require('validator');
var express = require('express');
var rand = require('unique-random')(1000, 9999);

var router = express.Router();
var app = express();



//app.set('MONGOLAB_URI', (process.env.MONGOLAB_URI || 'mongodb://dbuser:dbpass@ds157278.mlab.com:57278/url'));
//var url = process.env.MONGOLAB_URI;
mongoose.connect('mongodb://dbuser:dbpass@ds157278.mlab.com:57278/url');


router.all('/', function(req, res){
	res.send('Input the URL to be shorten after https://intense-fjord-36400.herokuapp.com/url/[URL-TO-BE-SHORTEN]');
});



var urlSchema = mongoose.Schema({
    urlString : String,
    uid : Number
});

var url = mongoose.model('url', urlSchema);


router.get('/:uid([0-9]{4})',function(req,res){

	url.findOne({uid: req.params.uid},
		"urlString",
		function(err, response){
				if(err)
					res.send("Error");
				else if(!response){
					res.send("Nothing Found");
				}
				else{
					console.log(response);
					res.redirect('http://'+response.urlString);

				}

		});
	

});



router.get((/^\/((https?:\/\/)?).*$/), function(req, res){
	var urlString = req.path.substr(1);
	if(validator.isURL(urlString)){
		
		console.log("VALID URL "+urlString);

		var uid = rand();
		newUrl = new url({
			urlString:urlString,
			uid:uid
		});

		newUrl.save(function(err){
			if(err)
				res.send("SAVE ERROR");
			else
				{
					res.json({
							Original_url: urlString,
							Shortned_Url: "https://intense-fjord-36400.herokuapp.com/url/"+uid	

					});					

				};
		});


	}
	else
	res.send("INVALID URL "+urlString);

});




//export this router to use in our index.js
module.exports = router;