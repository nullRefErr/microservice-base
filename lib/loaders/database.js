const mongoose = require('mongoose');
const _ = require('lodash');
const logger = require('../utils/logger');
const { STORE_CONNECTION_TIMEOUT } = require('../types/defaults');
const { DatabaseError } = require('../types/error');

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

module.exports.init = ({
    MONGO_IS_ENABLED,
    MONGO_HOST,
}) => {
    if (MONGO_IS_ENABLED) {
        const mongoInstance = mongoose.createConnection(MONGO_HOST, {
            useNewUrlParser: true,
            keepAlive: true,
            autoReconnect: true,
            reconnectTries: 3,
            reconnectInterval: 5000,
            w: 'majority',
        });
        clients.mongoInstance = mongoInstance;
        instanceEventListeners({ conn: mongoInstance });
    }
};

module.exports.closeConnections = () => _.forOwn(clients, (conn) => conn.close());

module.exports.getClients = () => clients;
