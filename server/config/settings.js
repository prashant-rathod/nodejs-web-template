/**
* Dependencies.
*/
var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

    process.env.NPM_CONFIG_PRODUCTION = 'false';

// Defaults that you can access when you require this config.

var apiConfig = {
    root: rootPath,
    port: parseInt(process.env.OPENSHIFT_NODEJS_PORT, 10) || 3000,
    ip: process.env.OPENSHIFT_NODEJS_IP
}
process.env.NPM_CONFIG_PRODUCTION = true;
var servingDir = './public/' + (process.env.NPM_CONFIG_PRODUCTION == 'true' ? 'dist' : 'dev');

var recaptcha = {
    PUBLIC_KEY: 'PUBLIC_KEY',
    PRIVATE_KEY: 'PRIVATE_KEY'
}

module.exports = { HapiConfig: apiConfig, ServingDir: servingDir, Recaptcha: recaptcha }