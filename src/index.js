var server = require('./server'),
    router = require('./router'),
    requestHandlers = require('./requestHandlers');

var handleObject = {
    '/' : requestHandlers.start,
    '/start' : requestHandlers.start,
    '/addProfile' : requestHandlers.addProfile,
    '/profileBrowser.html' : requestHandlers.profileBrowser
};

server.start(router.route, handleObject);
