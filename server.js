const Hapi = require('hapi'),
    config = require('./server/config/settings').HapiConfig;

const server = new Hapi.Server();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;

if (typeof ipaddress === "undefined") {
      ipaddress = "127.0.0.1";
}
server.connection({ host:ipaddress, port: config.port });

require('./server/config/plugins')(server);

// Add the server routes
server.route(require('./server/config/routes'));


//Start the server
server.start(function() {
    //Log to the console the host and port info
    console.log('Server started at: ' + server.info.uri);
});

	