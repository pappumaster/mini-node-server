var fs = require('fs'),
    dbOperations = require('./dbOperations');

module.exports = {
    'profileBrowser' : profileBrowser,
    'addProfile' : addProfile,
    'fetchProfiles' : fetchProfiles
};

function profileBrowser(response) { 
    fs.readFile('../files/profileBrowser.html', function(err, data) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    });
}
function addProfile(response, postData, headers) {
    try {
        var postObject = JSON.parse(postData);
        postObject.acceptHeaders = {};
	postObject.acceptHeaders['accept'] = headers['accept'];
	postObject.acceptHeaders['accept-language'] = headers['accept-language'];
	postObject.acceptHeaders['accept-encoding'] = headers['accept-encoding'];
        postObject.ID = djb2Code(postObject.navigator.UserAgent + postObject.screen.width.toString() + postObject.screen.height.toString() + postObject.navigator.plugins.length.toString());
        dbOperations.writeProfileToDB(postObject);
    } catch(e) {
        console.log(e);
    }
    response.writeHead(200);
    response.write('Thanks for letting us fingerprint your browser!\nHave a good day!');
    response.end();
    function djb2Code(str){
        var hash = 5381;
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            hash = ((hash << 5) + hash) + code;/* hash * 33 + c */
        }
        return hash;
    };
}
function fetchProfiles(response) {
    dbOperations.fetchProfilesFromDB(response);
}
