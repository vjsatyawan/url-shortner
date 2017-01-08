var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var mongoose = require('mongoose');


app.set('port', (process.env.PORT || 5000));
//app.set('MONGOLAB_URI', (process.env.MONGOLAB_URI || 'mongodb://dbuser:dbpass@ds157278.mlab.com:57278/url'));


//mongoose.Promise = global.Promise;
//var url = process.env.MONGOLAB_URI;


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var url = require('./routes/url.js');

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.redirect('/url');
});


app.use('/url', url);


app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


