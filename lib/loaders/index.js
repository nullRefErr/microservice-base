const serverLoader = require('./server');
const routesLoader = require('./route');
const databaseLoader = require('./database');
const cacheStoreLoader = require('./cacheStore');
const mailerLoader = require('./mailer');

module.exports.init = ({ applicationServer }, {
    ROUTES_FOLDER,
    MONGO_IS_ENABLED,
    MONGO_HOST,
    REDIS_IS_ENABLED,
    REDIS_HOST,
    SES_REGION,
    SES_API_VERSION,
    SES_USER_ACCESS_KEY_ID,
    SES_USER_SCREET_ACCESS_KEY,
    EMAIL_IS_ENABLED,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_SEND_LOCALLY,
}) => {
    const { httpServer } = serverLoader({ applicationServer });

    databaseLoader.init({
        MONGO_IS_ENABLED,
        MONGO_HOST,
    });

    cacheStoreLoader.init({
        REDIS_IS_ENABLED,
        REDIS_HOST,
    });

    routesLoader({ applicationServer }, { routesFolder: ROUTES_FOLDER });

    mailerLoader.init({
        SES_REGION,
        SES_API_VERSION,
        SES_USER_ACCESS_KEY_ID,
        SES_USER_SCREET_ACCESS_KEY,
        EMAIL_IS_ENABLED,
        EMAIL_HOST,
        EMAIL_PORT,
        EMAIL_USER,
        EMAIL_PASS,
        EMAIL_SEND_LOCALLY,
    });

    return { httpServer };
};
