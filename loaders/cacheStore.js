const redis = require('redis');
const _ = require('lodash');
const { CACHESTORE } = require('../config');
const { STORE_CONNECTION_TIMEOUT } = require('../core/types/defaults');
const { CacheStoreError } = require('../core/types/error');
const logger = require('../core/utils/logger');

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

module.exports.init = () => {
    console.log('CACHESTORE.REDIS_CACHE.HOST', CACHESTORE.REDIS_CACHE.HOST);
    const cacheInstance = redis.createClient(CACHESTORE.REDIS_CACHE.HOST);
    clients.cacheInstance = cacheInstance;
    instanceEventListeners({ conn: cacheInstance });
};

module.exports.getClients = () => clients;

module.exports.closeConnections = () => _.forOwn(clients, (conn) => conn.quit());
