const Message = require("../models/MessageModel");
const profanity = require("profanity-hindi");
const moment = require("moment");

exports.sendMessage = async (req, res) => {
  const { message, username: receiver_username } = req.body;

  try {
    var containsProfanity = profanity.isMessageDirty(message);

    if (containsProfanity) {
      return res.status(400).json({
        success: false,
        error: "Your message contains profanity! Please be kind to others.",
      });
    }

    const newMessage = new Message({
      message: message,
      receiver_username: receiver_username,
      time_submitted: moment().format("dddd, MMMM Do"),
    });

    await newMessage.save();

    res.status(200).json({
      success: true,
      message: "Message received and saved successfully",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getMessages = async (req, res) => {
  const { decodedData } = req.query;
  try {
    const { username } = decodedData;
    const messages = await Message.find({
      receiver_username: username,
    });
    res.json({ success: true, message: messages });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await Message.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).json({ success: true, message: "Message deleted" });
    } else {
      res.status(404).json({ success: false, error: "Message not found" });
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
