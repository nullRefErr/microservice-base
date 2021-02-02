const serverLoader = require('./server');
const routesLoader = require('./route');
const databaseLoader = require('./database');
const cacheStoreLoader = require('./cacheStore');

module.exports.init = ({ applicationServer }) => {
    const { httpServer } = serverLoader({ applicationServer });
    databaseLoader.init();
    cacheStoreLoader.init();
    routesLoader({ applicationServer });

    return { httpServer };
};
