// Dependencies
var mongoose = require('mongoose');
var Marker = require('./models/marker.js');
var port = process.env.PORT || 8080;
var host = process.env.HOST || "localhost";


// Opens App Routes
module.exports = function(app) {

  app.get('/', function(req, res){
    var links = [];
    links.push(host+"/markers");
    res.json(links);
  });
  // GET Routes
  // --------------------------------------------------------
  // Retrieve records for all markers in the db
  app.get('/markers', function(req, res){

    var filters = req.query.filter;
    var pages = req.query.page;
    // Uses Mongoose schema to run the search (empty conditions)

    var query = null;
    if(filters){
      if(filters.search){
          query = Marker.find(
              { $text : { $search : filters.search } },
              { score : { $meta: "textScore" } }
          ).sort({ score : { $meta : 'textScore' } });
      }
      else if(filters.latitude && filters.longitude){
        var distance = 10000;
        if(filters.distance){
          distance = Number(filters.distance);
        }
        query = Marker.find(
            {coordinates: {$near :{$geometry :{type: 'Point', coordinates: [Number(filters.longitude) , Number(filters.latitude)]}, $maxDistance: distance}}}
        );
      }
      else{
        var queryParams = {};
        if(filters.county){
          queryParams.county=filters.county;
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
        query = Marker.find(queryParams);
      }
    }
    else{
      query = Marker.find({});
    }
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

    query.exec(function(err, markers){
      if(err) {
        res.send(err);
      }
      else {
        console.log('Size ' + markers.length);
        var result = {};
        result.data=[];
        markers.forEach(function(item){
          result.data.push(formatData(item));
        });
        // If no errors are found, it responds with a JSON of all markers
        res.json(result);
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
        var result = {};
        result.data=[];
        result.data.push(formatData(markers));
        // If no errors are found, it responds with a JSON of all markers
        res.json(result);
      }
    });
  });

};
function formatData(data){
  data = data.toObject();
  var obj = {};
  obj.id = data["_id"];
  delete data["_id"];
  obj.type="marker";
  obj.attributes = data;
  return obj;
}
