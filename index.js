const lib = require('./lib/bin/www');

lib.Start({
    ROUTES_FOLDER: './routes',
    APP_PORT: 1338,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_IS_ENABLED: false,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_PORT: Number.parseInt(process.env.EMAIL_PORT),
    EMAIL_SEND_LOCALLY: true,
    EMAIL_USER: process.env.EMAIL_USER,
    MONGO_HOST: process.env.DATABASE_HOST,
    MONGO_IS_ENABLED: true,
    REDIS_HOST: process.env.REDIS_CACHE_HOST,
    REDIS_IS_ENABLED: false,
    SES_API_VERSION: process.env.SES_API_VERSION,
    SES_REGION: process.env.SES_REGION,
    SES_USER_ACCESS_KEY_ID: process.env.SES_USER_ACCESS_KEY_ID,
    SES_USER_SCREET_ACCESS_KEY: process.env.SES_USER_SCREET_ACCESS_KEY,
});
