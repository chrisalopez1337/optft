const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tft-dev');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    hashed_pwd: String,
});

const Users = mongoose.model('Users', userSchema);

module.exports = { Users };
