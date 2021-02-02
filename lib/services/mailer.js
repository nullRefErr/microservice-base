const mailerLoader = require('../loaders/mailer');
const config = require('../../config');

module.exports.sendEmail = ({ subject, emailBody, receiver }) => mailerLoader.getClient().sendMail({
    from: `"Boilerplate 🚀" <${config.EMAIL.USER}>`,
    to: receiver,
    subject,
    html: emailBody,
});
