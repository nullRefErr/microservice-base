const mongoose = require('mongoose');
const _ = require('lodash');

const clients = {};
let connectionTimeout;

function throwTimeoutError() {
    connectionTimeout = setTimeout(() => {
        throw Error('Mongo connection failed');
    }, 10000);
}

function instanceEventListeners({ conn }) {
    conn.on('connected', () => {
        console.log('Mongo - connected');
        clearTimeout(connectionTimeout);
    });

    conn.on('disconnected', () => {
        console.log('Mongo - disconnected');
        throwTimeoutError();
    });

    conn.on('reconnected', () => {
        console.log('Mongo - reconnected');
        clearTimeout(connectionTimeout);
    });

    conn.on('close', () => {
        console.log('Mongo - closed');
        clearTimeout(connectionTimeout);
    });
}

module.exports.init = () => {
    const mongoInstance = mongoose.createConnection('mongodb://localhost:1330', {
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
