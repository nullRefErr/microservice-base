const userModel = require('../models/user');

module.exports.helloWorld = async () => 'Hello World';

module.exports.dbExample = async () => {
    await userModel.create({ name: 'test', surname: 'test', age: 75, email: 'test@mail.com' });
    const records = await userModel.find().lean().exec();
    return records;
}
