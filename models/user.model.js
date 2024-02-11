const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: { type: String, required: true, minlength: 6, maxlength: 30 },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, required: true },
    phoneNumber: { type: Number, required: true, minlength: 9, maxlength: 25 },
  });

module.exports = mongoose.model('User', userSchema);