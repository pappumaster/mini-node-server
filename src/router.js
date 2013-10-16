var _ = require('underscore'),
    requestHandlers = require('./requestHandlers');

exports.route = function(pathname, handle, response, postData, headers) {
    if (_.isFunction(handle[pathname])) {
        if (postData !== "") {
            handle[pathname](response, postData, headers);
        } else {
            handle[pathname](response);
        }
    } else {
        console.log(pathname + " was not found.");
        response.writeHead(404);
        response.end();
    }
};
