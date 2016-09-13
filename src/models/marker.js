'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
    county: String,
    location: String,
    dedicatedDate: Date,
    coordinates: [ { type: Number } ],
    markerType: String,
    missing: Boolean,
    categories: String,
    markerText: String
});

module.exports = mongoose.model('Marker', schema);
