const database = require('../../loaders/database');

const appStatus = {
    server: true,
    database: true,
};

function kill(code) {
    setTimeout(() => {
        console.log('Shutting Down');
        process.exit(code);
    }, 10000);
}

function handleShutdown({ applicationServer }) {
    try {
        applicationServer.close();
        database.closeConnections();
        appStatus.server = false;
        appStatus.database = false;
        kill(0);
    } catch (error) {
        console.log(error);
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
