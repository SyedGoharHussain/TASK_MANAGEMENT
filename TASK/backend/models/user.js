const mongoose = require('mongoose');
const task = require('./task');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'task'
        }]
});

module.exports = mongoose.model('user', userSchema); // user is the name of the collection in MongoDB userScema is the schema for the collection