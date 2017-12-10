var handlers = require(__dirname + '/handlers');
var basePath = require(__dirname + '/settings').ServingDir;
var routes = [
    {
        path: '/{path*}',
        method: 'GET',
        handler: {
            file: basePath + '/index.html'
        }
    },
    {
        path: '/favicon.ico',
        method: 'GET',
        handler: {
            file: basePath + '/favicon.ico'
        }
    },
    {
        path: '/robots.txt',
        method: 'GET',
        handler: {
            file: basePath + '/robots.txt'
        }
    },
    {
        path: '/css/{path*}',
        method: 'GET',
        handler: {
            directory: {
                path: basePath + '/css'
            }
        }
    },
    {
        path: '/fonts/{path*}',
        method: 'GET',
        handler: {
            directory: {
                path: basePath + '/fonts'
            }
        }
    },
    {
        path: '/images/{path*}',
        method: 'GET',
        handler: {
            directory: {
                path: basePath + '/images'
            }
        }
    },
    {
        path: '/js/{path*}',
        method: 'GET',
        handler: {
            directory: {
                path: basePath + '/js'
            }
        }
    },
    {
        path: '/api/contact',
        method: 'POST',
        handler: handlers.sendEmail
    }
];

module.exports = routes;