const mailerLoader = require('../loaders/mailer');

module.exports.sendEmail = ({ subject, emailBody, receiver, EMAIL_USER }) => mailerLoader.getClient().sendMail({
    from: `"Boilerplate 🚀" <${EMAIL_USER}>`,
    to: receiver,
    subject,
    html: emailBody,
});
