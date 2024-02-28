const express = require("express");
const router = express.Router();
const { format } = require("date-fns");
const db = require("../database");

router.post("/sendMessage", async (req, res) => {
  const { message, username } = req.body;
  console.log("Received message:", message, username);

  try {
    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length > 0) {
      const currentTime = new Date();
      const formattedTime = format(
        currentTime,
        "MMMM dd, yyyy | EEEE | hh:mmaa"
      );
      const ipAddress = req.ip;

      await db.query(
        "INSERT INTO messages (message, time, ip_address, username) VALUES ($1, $2, $3, $4)",
        [message, formattedTime, ipAddress, username]
      );

      res.status(200).json({
        success: true,
        message: "Message received and saved successfully",
      });
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
