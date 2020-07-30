module.exports = {
    PORT: parseInt(process.env.PORT) || 3000,
    DATABASE: {
        HOST: process.env.DATABASE_HOST,
        PORT: process.env.DATABASE_PORT,
    },
    CACHESTORE: {
        REDIS_CACHE: {
            HOST: process.env.REDIS_CACHE_HOST,
            PORT: parseInt(process.env.REDIS_CACHE_PORT),
        },
    },
};
