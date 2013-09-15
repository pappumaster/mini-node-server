var fs = require('fs'),
    writeToDB = require('./writeToDB');

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
function addProfile(response, postData) {
    try {
        writeToDB.writeProfileToDB(JSON.parse(postData));
    } catch(e) {
        console.log(e);
    }
    response.writeHead(200);
    response.write('Thanks for letting us fingerprint your browser!\nHave a good day!');
    response.end();
}
function fetchProfiles(response) {

}
