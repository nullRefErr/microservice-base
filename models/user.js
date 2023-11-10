const { getClients } = require('../lib/loaders/database');

const { Schema } = getClients().mongoInstance;
const userSchema = new Schema({
    name: String,
    surname: { text: String },
    age: Number,
    email: { type: String }
});
const User = getClients().mongoInstance.model('user', userSchema);

module.exports = User;
