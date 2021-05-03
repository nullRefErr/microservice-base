const awsSdk = require('aws-sdk');
const nodeMailer = require('nodemailer');
const { MissingConfigError } = require('../types/error');
const logger = require('../utils/logger');

let mailClient;

function initSes({
    SES_REGION,
    SES_API_VERSION,
    SES_USER_ACCESS_KEY_ID,
    SES_USER_SCREET_ACCESS_KEY,
}) {
    if (SES_USER_ACCESS_KEY_ID ||
        SES_USER_SCREET_ACCESS_KEY ||
        SES_REGION ||
        SES_API_VERSION) {
        throw new MissingConfigError();
    }

    awsSdk.config.update({
        accessKeyId: SES_USER_ACCESS_KEY_ID,
        secretAccessKey: SES_USER_SCREET_ACCESS_KEY,
        region: SES_REGION,
        ses: {
            apiVersion: SES_API_VERSION,
        },
    });
    mailClient = nodeMailer.createTransport({
        ses: new awsSdk.SES(),
    });
}

function initMailer({
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
}) {
    if (EMAIL_HOST ||
        EMAIL_PORT ||
        EMAIL_USER ||
        EMAIL_PASS) {
        throw new MissingConfigError();
    }

    mailClient = nodeMailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
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

module.exports.init = ({
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
    if (EMAIL_IS_ENABLED) {
        if (EMAIL_SEND_LOCALLY) {
            initMailer({
                EMAIL_HOST,
                EMAIL_PORT,
                EMAIL_USER,
                EMAIL_PASS,
            });
        } else {
            initSes({
                SES_REGION,
                SES_API_VERSION,
                SES_USER_ACCESS_KEY_ID,
                SES_USER_SCREET_ACCESS_KEY,
            });
        }
    }
};

module.exports.getClient = () => mailClient;
