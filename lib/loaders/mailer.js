const awsSdk = require('aws-sdk');
const nodeMailer = require('nodemailer');
const config = require('../../config');
const { MissingConfigError } = require('../types/error');
const logger = require('../utils/logger');

let mailClient;

function initSes() {
    if (!config.AWS.SES.USER_ACCESS_KEY_ID ||
        !config.AWS.SES.USER_SCREET_ACCESS_KEY ||
        !config.AWS.SES.REGION ||
        !config.AWS.SES.API_VERSION) {
        throw new MissingConfigError();
    }

    awsSdk.config.update({
        accessKeyId: config.AWS.SES.USER_ACCESS_KEY_ID,
        secretAccessKey: config.AWS.SES.USER_SCREET_ACCESS_KEY,
        region: config.AWS.SES.REGION,
        ses: {
            apiVersion: config.AWS.SES.API_VERSION,
        },
    });
    mailClient = nodeMailer.createTransport({
        ses: new awsSdk.SES(),
    });
}

function initMailer() {
    if (!config.EMAIL.HOST ||
        !config.EMAIL.PORT ||
        !config.EMAIL.USER ||
        !config.EMAIL.PASS) {
        throw new MissingConfigError();
    }

    mailClient = nodeMailer.createTransport({
        host: config.EMAIL.HOST,
        port: config.EMAIL.PORT,
        auth: {
            user: config.EMAIL.USER,
            pass: config.EMAIL.PASS,
        },
    });

    mailClient.verify((error, success) => {
        if (error) {
            logger.error('SMTP Mail transport is failed', { error });
        } else {
            logger.info('SMTP Mail transport is verified', { success });
        }
    });
}

module.exports.init = () => {
    if (config.EMAIL.SEND_LOCALLY) {
        initMailer();
    } else {
        initSes();
    }
};

module.exports.getClient = () => mailClient;
