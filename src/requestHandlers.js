var fs = require('fs');

module.exports = {
    'profileBrowser' : profileBrowser,
    'addProfile' : addProfile
};

function profileBrowser(response) {
    console.log('Profiling browser called');
    
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
    response.writeHead(200);
    response.write('Thanks for letting us fingerprint your browser!');
    response.end();
}
