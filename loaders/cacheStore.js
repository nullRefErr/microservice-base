const redis = require('redis');
const _ = require('lodash');
const { CACHESTORE } = require('../config');
const { STORE_CONNECTION_TIMEOUT } = require('../core/types/defaults');
const logger = require('../core/utils/logger');

const clients = {};
let connectionTimeout;

function throwTimeoutError() {
    connectionTimeout = setTimeout(() => {
        throw Error('CacheStore connection failed');
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

module.exports.init = () => {
    const cacheInstance = redis.createClient(CACHESTORE.REDIS_CACHE.PORT, CACHESTORE.REDIS_CACHE.HOST);
    clients.cacheInstance = cacheInstance;
    instanceEventListeners({ conn: cacheInstance });
};

module.exports.getClients = () => clients;

module.exports.closeConnections = () => _.forOwn(clients, (conn) => conn.quit());
