const serverLoader = require('./server');
const routesLoader = require('./route');
const databaseLoader = require('./database');
const cacheStoreLoader = require('./cacheStore');
const mailerLoader = require('./mailer');

module.exports.init = ({ applicationServer }) => {
    const { httpServer } = serverLoader({ applicationServer });
    databaseLoader.init();
    cacheStoreLoader.init();
    routesLoader({ applicationServer });
    mailerLoader.init();

    return { httpServer };
};
