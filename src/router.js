exports.route = function(pathname, handle, response, postData) {
    console.log('About to route a request for ' + pathname);

    if (typeof handle[pathname] === 'function') {
        if (postData !== "") {
            handle[pathname](response, postData);
        } else {
            handle[pathname](response);
        }
    } else {
        console.log('No request handler found for ' + pathname);
    }
};
