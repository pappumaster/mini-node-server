var server = require('./server'),
    router = require('./router'),
    requestHandlers = require('./requestHandlers');

var handleObject = {
    '/addProfile' : requestHandlers.addProfile,
    '/profileBrowser' : requestHandlers.profileBrowser
};

server.start(router.route, handleObject);
