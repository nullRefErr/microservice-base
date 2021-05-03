const redis = require('redis');
const _ = require('lodash');
const { STORE_CONNECTION_TIMEOUT } = require('../types/defaults');
const { CacheStoreError } = require('../types/error');
const logger = require('../utils/logger');

const clients = {};
let connectionTimeout;

function throwTimeoutError() {
    connectionTimeout = setTimeout(() => {
        throw new CacheStoreError();
    }, STORE_CONNECTION_TIMEOUT);
}

function instanceEventListeners({ conn }) {
    conn.on('connect', () => {
        logger.info('CacheStore - Connection status: connected');
        clearTimeout(connectionTimeout);
    });

    conn.on('end', () => {
        logger.info('CacheStore - Connection status: disconnected');
        throwTimeoutError();
    });

    conn.on('reconnecting', () => {
        logger.info('CacheStore - Connection status: reconnecting');
        clearTimeout(connectionTimeout);
    });

    conn.on('error', (err) => {
        logger.info('CacheStore - Connection status: error ', { err });
        throwTimeoutError();
    });
}

module.exports.init = ({
    REDIS_IS_ENABLED,
    REDIS_HOST,
}) => {
    if (REDIS_IS_ENABLED) {
        const cacheInstance = redis.createClient(REDIS_HOST);
        clients.cacheInstance = cacheInstance;
        instanceEventListeners({ conn: cacheInstance });
    }
};

module.exports.getClients = () => clients;

module.exports.closeConnections = () => _.forOwn(clients, (conn) => conn.quit());
