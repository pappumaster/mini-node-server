var http = require('http'),
    url = require('url');

exports.start = function(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        console.log('Request for ' + pathname + ' received'); 

        if (pathname === '/addProfile') {
   	    request.setEncoding('utf8');
            var postData = "";
            request.addListener('data', function(postDataChunk) { 
		postData += postDataChunk;
            });
            request.addListener('end', function() {
                route(pathname, handle, response, postData);
            });
        } else {
            route(pathname, handle, response, "");
        }
    }

    http.createServer(onRequest).listen(8080);
    console.log('Server has started. Waiting for requests...');
};
