module.exports = {
    SECRETS: {
        JWT: process.env.SECRETS_JWT || '123456',
    },
    PORT: parseInt(process.env.PORT) || 1338,
    DATABASE: {
        IS_ENABLED: !(process.env.DATABASE_HOST_IS_ENABLED &&
        Boolean(process.env.DATABASE_HOST_IS_ENABLED) !== true),
        HOST: process.env.DATABASE_HOST || 'mongodb://localhost:27017',
    },
    CACHESTORE: {
        REDIS_CACHE: {
            IS_ENABLED: !(process.env.REDIS_CACHE_HOST_IS_ENABLED &&
            Boolean(process.env.REDIS_CACHE_HOST_IS_ENABLED) !== true),
            HOST: process.env.REDIS_CACHE_HOST || 'redis://localhost:6379',
        },
    },
    AWS: {
        SES: {
            REGION: process.env.SES_REGION,
            API_VERSION: process.env.SES_API_VERSION,
            USER_ACCESS_KEY_ID: process.env.SES_USER_ACCESS_KEY_ID,
            USER_SCREET_ACCESS_KEY: process.env.SES_USER_SCREET_ACCESS_KEY,
        },
    },
    EMAIL: {
        IS_ENABLED: !(process.env.EMAIL_IS_ENABLED &&
        Boolean(process.env.EMAIL_IS_ENABLED) !== true),
        HOST: process.env.EMAIL_HOST,
        PORT: Number.parseInt(process.env.EMAIL_PORT),
        USER: process.env.EMAIL_USER,
        PASS: process.env.EMAIL_PASS,
        SEND_LOCALLY: process.env.EMAIL_SEND_LOCALLY === 'true',
    },
};
