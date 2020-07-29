const mongoose = require('mongoose');

const clients = {};

function instanceEventListeners({ conn }) {
    const connectionTimeout = setInterval(() => {
        throw Error('Mongo disconnected');
    }, 10000);

    conn.on('connected', () => {
        console.log('Mongo - connected');
        clearInterval(connectionTimeout);
    });

    conn.on('disconnected', () => {
        console.log('Mongo - disconnecting');
        connectionTimeout();
    });

    conn.on('reconnected', () => {
        console.log('Mongo - reconnecting');
        clearInterval(connectionTimeout);
    });
}

module.exports.init = () => {
    const mongoInstance = mongoose.createConnection('mongodb://localhost:1330');

    clients.mongoInstance = mongoInstance;
    instanceEventListeners({ conn: mongoInstance });
};

module.exports.getClients = () => clients;
