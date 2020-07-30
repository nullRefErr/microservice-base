const { isEmpty, omitBy } = require('lodash');
const winston = require('winston');

const getJsonInfo = ({ info, isPretty }) => {
    let error;

    // winston does not include error stack by default and error formatter does not work eighter,
    // thus we need to capture stack from the error instances
    if (info.error instanceof Error) {
        error = {
            message: info.error.message,
            stack: info.error.stack,
        };
    }

    const logData = {
        ...info,
        error,
    };

    const filteredLogData = omitBy(logData, isEmpty);

    return isPretty
        ? JSON.stringify(filteredLogData, null, 4)
        : JSON.stringify(filteredLogData);
};

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
            (info) => `${getJsonInfo({ info })}`
        )
    ),
    transports: [
        new winston.transports.Console({ level: 'verbose' }),
        new winston.transports.File({ filename: 'combined.log', level: 'verbose' }),
    ],
});

module.exports = logger;
