var server = 'localhost',
    port = 27017,
    dbName = 'crawlBrowseDB';

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    Q = require('q');

exports.writeProfileToDB = function(postData) {
    MongoClient.connect('mongodb://' + server + ':' + port + '/' + dbName, {native_parser:false}, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('browserProfiles');
        collection.findOne({ID : postData.ID}, function(err, item) {
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
              var ret_results = {};
              results.forEach(function(result) {
                  ret_results[result['ID']] = result;
              });
              response.writeHead(200);
              response.write(JSON.stringify(ret_results));
              response.end();
         });
     });
};

exports.listIDs = function() {
    var goDeferred = Q.defer();
    MongoClient.connect('mongodb://' + server + ':' + port + '/' + dbName, {native_parser:false}, function(err, db) {
	assert.equal(null, err);
        if (err) {
	    goDeferred.reject(err);
        }
	var collection = db.collection('browserProfiles');
        var objectPairs = [];
        collection.find().toArray(function(err, results) {
            results.forEach(function(el) {
                objectPairs.push({'ID' : el.ID, 'user_agent' : el.navigator.userAgent});
            });
            goDeferred.resolve(objectPairs);
        });
    });
    return goDeferred.promise;
};
