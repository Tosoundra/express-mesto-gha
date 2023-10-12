const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    minlength: 2,
  },
});
module.exports.UserModel = mongoose.model('user', UserSchema);
