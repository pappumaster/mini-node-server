var server = 'localhost',
    port = 27017,
    dbName = 'crawlBrowseDB';

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

exports.writeProfileToDB = function(postData) {
    MongoClient.connect('mongodb://' + server + ':' + port + '/' + dbName, {native_parser:false}, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('browserProfiles');
        collection.findOne(postData, function(err, item) {
	    if (!item) {
	        collection.insert(postData, function(err, results){});
            }
        });
    });
};

exports.fetchProfilesFromDB = function(response) {
     MongoClient.connect('mongodb://' + server + ':' + port + '/' + dbName, {native_parser:false}, function(err, db) {
         assert.equal(null, err);
         var collection = db.collection('browserProfiles');

         collection.find().toArray(function(err, results) {
              response.writeHead(200);
              response.write(JSON.stringify(results));
              response.end();
         });
     });
};
