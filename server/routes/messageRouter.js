const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController/messageController");

router.post("/sendMessage", messageController.sendMessage);
router.get("/getMessages", messageController.getMessages);
router.delete("/deleteMessage", messageController.deleteMessage);

module.exports = router;
