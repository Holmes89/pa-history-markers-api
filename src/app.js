'use strict';
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 8080;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();

// Start by loading up all our mongoose models and connecting.
mongoose.connect('mongodb://everyone:everyone@ds029426.mlab.com:29426/history-markers');

app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());

// Enable CORS. Note: if you copy this code into production, you may want to
// disable this. See https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

// Routes
// ------------------------------------------------------
require('./routes.js')(app);

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

module.exports = app;
