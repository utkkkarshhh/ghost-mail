const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  image: {
    type: Buffer,
    data: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
