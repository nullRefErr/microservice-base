module.exports = {
    PORT: parseInt(process.env.PORT) || 3000,
    DATABASE: {
        HOST: process.env.DATABASE_HOST,
        PORT: process.env.DATABASE_PORT,
    },
};
