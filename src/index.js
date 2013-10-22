var server = require('./server'),
    router = require('./router'),
    requestHandlers = require('./requestHandlers');

var handleObject = {
    '/profileBrowser' : requestHandlers.profileBrowser,
    '/addProfile' : requestHandlers.addProfile,
    '/fetchProfiles' : requestHandlers.fetchProfiles,
    '/getids.js' : requestHandlers.getids,
    '/browserids' : requestHandlers.browserids
};

server.start(router.route, handleObject);
