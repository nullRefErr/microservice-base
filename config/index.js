module.exports = {
    PORT: parseInt(process.env.PORT) || 3000,
    DATABASE: {
        HOST: process.env.DATABASE_HOST || 'localhost',
        PORT: process.env.DATABASE_PORT || '27017',
    },
    CACHESTORE: {
        REDIS_CACHE: {
            HOST: process.env.REDIS_CACHE_HOST || 'localhost',
            PORT: parseInt(process.env.REDIS_CACHE_PORT || 6379),
        },
    },
};
