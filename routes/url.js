var express = require('express');
var router = express.Router();
var app = express();

var mongoose = require('mongoose');
//app.set('MONGOLAB_URI', (process.env.MONGOLAB_URI || 'mongodb://dbuser:dbpass@ds157278.mlab.com:57278/url'));
//var url = process.env.MONGOLAB_URI;
mongoose.connect('mongodb://dbuser:dbpass@ds157278.mlab.com:57278/url');


router.get('/', function(req, res){
	res.send('GET route on things.');
});
router.post('/', function(req, res){
	res.send('POST route on things.');
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
					res.json({
							Original_url: response.urlString,
							Shortned_Url: "https://intense-fjord-36400.herokuapp.com/url/"+req.params.uid

					});
				}

		});
	

});


router.get('/:url', function(req, res){

		var uid = 1234;
		newUrl = new url({
			urlString:req.params.url,
			uid:uid
		});

		newUrl.save(function(err){
			if(err)
				res.send("RESPONSE ERROR");
			else
				res.send("Saved "+req.params.url)
				;
		});

});



//export this router to use in our index.js
module.exports = router;