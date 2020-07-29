const serverLoader = require('./server');
const routesLoader = require('./route');
const databaseLoader = require('./database');

module.exports.init = ({ applicationServer }) => {
    const { httpServer } = serverLoader({ applicationServer });
    routesLoader({ applicationServer });
    databaseLoader.init();

    return { httpServer };
};
