const logger = require('./logger');
const database = require('../../loaders/database');
const cacheStore = require('../../loaders/cacheStore');
const { SHUTDOWN_TIMER } = require('../types/defaults');

const appStatus = {
    server: true,
    database: true,
    cacheStore: true,
};

function kill(code) {
    setTimeout(() => {
        logger.info('Application is shutting down');
        process.exit(code);
    }, SHUTDOWN_TIMER);
}

function handleShutdown({ applicationServer }) {
    try {
        applicationServer.close();
        database.closeConnections();
        cacheStore.closeConnections();
        appStatus.server = false;
        appStatus.database = false;
        appStatus.cacheStore = false;
        kill(0);
    } catch (error) {
        logger.error('Error occurd while shutting dows application', { error });
        kill(1);
    }
}

module.exports = ({ applicationServer }) => {
    process.on('SIGINT', () => {
        handleShutdown({ applicationServer });
    });
    process.on('SIGTERM', () => {
        handleShutdown({ applicationServer });
    });
};

module.exports.getStatus = () => appStatus;
