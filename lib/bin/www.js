const express = require('express');
const loaders = require('../loaders');
const middlewares = require('../middlewares');
const gracefulShutdown = require('../utils/gracefulShutdown');
const logger = require('../utils/logger');

module.exports.Start = ({
    ROUTES_FOLDER = 'routes',
    APP_PORT = 1338,
    MONGO_IS_ENABLED = true,
    MONGO_HOST = 'mongodb://localhost:27017',
    REDIS_IS_ENABLED = true,
    REDIS_HOST = 'redis://localhost:6379',
    SES_REGION = null,
    SES_API_VERSION = null,
    SES_USER_ACCESS_KEY_ID = null,
    SES_USER_SCREET_ACCESS_KEY = null,
    EMAIL_IS_ENABLED = false,
    EMAIL_HOST = null,
    EMAIL_PORT = null,
    EMAIL_USER = null,
    EMAIL_PASS = null,
    EMAIL_SEND_LOCALLY = null,
}) => {
    const applicationServer = express();

    middlewares({ applicationServer });
    applicationServer.disable('etag');

    const { httpServer } = loaders.init({ applicationServer }, {
        ROUTES_FOLDER,
        MONGO_IS_ENABLED,
        MONGO_HOST,
        REDIS_IS_ENABLED,
        REDIS_HOST,
        SES_REGION,
        SES_API_VERSION,
        SES_USER_ACCESS_KEY_ID,
        SES_USER_SCREET_ACCESS_KEY,
        EMAIL_IS_ENABLED,
        EMAIL_HOST,
        EMAIL_PORT,
        EMAIL_USER,
        EMAIL_PASS,
        EMAIL_SEND_LOCALLY,
    });

    gracefulShutdown({ applicationServer: httpServer });

    applicationServer.set('port', APP_PORT);

    httpServer.listen(APP_PORT);

    httpServer.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof APP_PORT === 'string' ? `Pipe ${APP_PORT}` : `APP_PORT ${APP_PORT}`;

        switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
        }
    });

    httpServer.on('listening', () => {
        const addr = httpServer.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        logger.info('HTTP Server listening', { port: bind });
    });
};
