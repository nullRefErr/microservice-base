const mongoose = require('mongoose');
const _ = require('lodash');
const logger = require('../core/utils/logger');
const { STORE_CONNECTION_TIMEOUT } = require('../core/types/defaults');
const { DatabaseError } = require('../core/types/error');
const config = require('../config');

const clients = {};
let connectionTimeout;

function throwTimeoutError() {
    connectionTimeout = setTimeout(() => {
        throw new DatabaseError();
    }, STORE_CONNECTION_TIMEOUT);
}

function instanceEventListeners({ conn }) {
    conn.on('connected', () => {
        logger.info('Database - Connection status: connected');
        clearTimeout(connectionTimeout);
    });

    conn.on('disconnected', () => {
        logger.info('Database - Connection status: disconnected');
        throwTimeoutError();
    });

    conn.on('reconnected', () => {
        logger.info('Database - Connection status: reconnected');
        clearTimeout(connectionTimeout);
    });

    conn.on('close', () => {
        logger.info('Database - Connection status: close ');
        clearTimeout(connectionTimeout);
    });
}

module.exports.init = () => {
    const mongoInstance = mongoose.createConnection(config.DATABASE.HOST, {
        useNewUrlParser: true,
        keepAlive: true,
        autoReconnect: true,
        reconnectTries: 3,
        reconnectInterval: 5000,
    });

    clients.mongoInstance = mongoInstance;
    instanceEventListeners({ conn: mongoInstance });
};

module.exports.closeConnections = () => _.forOwn(clients, (conn) => conn.close());

module.exports.getClients = () => clients;
