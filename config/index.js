module.exports = {
    PORT: parseInt(process.env.PORT) || 3000,
    DATABASE: {
        HOST: process.env.DATABASE_HOST,
    },
    CACHESTORE: {
        REDIS_CACHE: {
            HOST: process.env.REDIS_CACHE_HOST,
        },
    },
};
