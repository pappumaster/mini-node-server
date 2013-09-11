var _ = require('underscore');

exports.route = function(pathname, handle, response, postData) {
    console.log('About to route a request for ' + pathname);

    if (_.isFunction(handle[pathname])) {
        if (postData !== "") {
            handle[pathname](response, postData);
        } else {
            handle[pathname](response);
        }
    } else {
        console.log(pathname + ' not found.');
        response.writeHead(404);
        response.end();
    }
};
