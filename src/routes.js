// Dependencies
var mongoose = require('mongoose');
var Marker = require('./models/marker.js');


// Opens App Routes
module.exports = function(app) {

  // GET Routes
  // --------------------------------------------------------
  // Retrieve records for all markers in the db
  app.get('/markers', function(req, res){

    var filters = req.query.filter;
    var pages = req.query.page;
    // Uses Mongoose schema to run the search (empty conditions)
    var queryParams = {};

    if(filters){
      if(filters.county){
        queryParams.county=filters.county;
      }
      if(filters.latitude && filters.longitude){
        var geo = {};
        geo["$near"] = new Array(Number(filters.longitude), Number(filters.latitude));
        geo["$maxDistance"]=10;
        queryParams.coordinates = geo;
      }
      if(filters.markerType){
        queryParams.markerType=filters.markerType;
      }
      if(filters.missing){
        queryParams.missing=filters.missing;
      }
      if(filters.categories){
        queryParams.categories=filters.categories;
      }
    }
    var query = Marker.find(queryParams);
    if(pages){
      var pageSize = pages["size"];
      if(pageSize){
        pageSize = Number(pageSize);
        if(pageSize==NaN)
          pageSize=20;
      }
      else{
        pageSize=20;
      }

      var pageNumber = pages["number"];
      if(pageNumber){
        pageNumber = Number(pageNumber);
        if(pageNumber==NaN)
          pageNumber=0;
        else{
          pageNumber = pageNumber * pageSize;
        }
      }
      else{
        pageNumber=0;
      }
      query.limit(pageSize).skip(pageNumber);
    }
    else{
      query.limit(20);
    }
    console.log('Params ' + JSON.stringify(queryParams));

    query.exec(function(err, markers){
      if(err) {
        res.send(err);
      } else {
        // If no errors are found, it responds with a JSON of all markers
        res.json(markers);
      }
    });
  });
  app.get('/markers/:id', function(req, res){
    // Uses Mongoose schema to run the search (empty conditions)
    var query = Marker.findOne({'_id': req.params.id});
    query.exec(function(err, markers){
      if(err) {
        res.send(err);
      } else {
        // If no errors are found, it responds with a JSON of all markers
        res.json(markers);
      }
    });
  });

};
