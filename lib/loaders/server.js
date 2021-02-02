const http = require('http');

module.exports = ({ applicationServer }) => {
    const httpServer = http.createServer(applicationServer);

    return { httpServer };
};
