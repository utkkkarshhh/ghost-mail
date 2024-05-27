const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  receiver_username: {
    type: String,
    required: true,
  },
  time_submitted: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
