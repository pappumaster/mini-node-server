var fs = require('fs');

module.exports = {
    'profileBrowser' : profileBrowser,
    'start' : start,
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
function start(response) {
    console.log('start was called');
}
function addProfile(response, postData) {
    console.log('addProfile was called');
    console.log('Post data: ' + postData);
}
