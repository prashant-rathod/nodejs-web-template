module.exports = function (server) {

    var inert = require('inert');

    server.register(inert, function (err) {
        if (err) {
            throw err;
        }
    });
}