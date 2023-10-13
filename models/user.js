const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    trim: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
});
module.exports.UserModel = mongoose.model('user', UserSchema);
