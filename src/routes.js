// Dependencies
var mongoose        = require('mongoose');
var Marker            = require('./models/marker.js');


// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/markers', function(req, res){

	// Uses Mongoose schema to run the search (empty conditions)
	var query = Marker.find({});
	query.exec(function(err, users){
	    if(err) {
		res.send(err);
	    } else {
		// If no errors are found, it responds with a JSON of all users
		res.json(users);
	    }
	});
    });

};
