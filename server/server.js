const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { format } = require("date-fns");
const db = require("./database");
const profanity = require("profanity-hindi");

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json(apiDetails);
});

//Routes
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );
    if (user.rows.length > 0) {
      res.status(400).json({ messaage: "User already registered" });
    } else {
      await db.query(
        "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)",
        [email, username, hashedPassword]
      );
      res.status(200).json({
        success: true,
        message: "Message registered successfully",
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length > 0) {
      const passwordMatch = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (passwordMatch) {
        const data = {
          username: user.rows[0].username,
          name: user.rows[0].name,
          tokenVersion: user.rows[0].tokenVersion,
        };
        const accessToken = jwt.sign(data, "Johnny Johnny Yes Papa", {
          expiresIn: "7d",
        });
        res.status(200).json({
          success: true,
          message: "Logged in successfully",
          accessToken,
        });
        console.log("Logged in successfully", user.rows);
      } else {
        res.status(401).json({ success: false, error: "Incorrect password" });
      }
    } else {
      res.status(401).json({ success: false, error: "Incorrect username." });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.delete("/deleteAccount", async (req, res) => {
  const { username } = req.body;
  try {
    const response = await db.query("DELETE FROM users WHERE username = $1", [
      username,
    ]);
    if (response.rowCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "User account deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "User account not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.delete("/logout", (req, res) => {
  try {
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


//Messaging Logic

app.post("/send", async (req, res) => {
  const { message, username } = req.body;
  console.log("Received message:", message, username);

  try {
    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    var containsProfanity = profanity.isMessageDirty(message);

    if (containsProfanity) {
      console.log("Message contained profanity:", containsProfanity);
      return res.status(400).json({
        success: false,
        error: "Your message contains profanity! Please be kind to others.",
      });
    }

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

app.get("/getMessages", async (req, res) => {
  const { decodedData } = req.query;
  try {
    const { username } = decodedData;
    const response = await db.query(
      "SELECT * FROM messages WHERE username = $1",
      [username]
    );
    res.json({ success: true, message: response.rows });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.delete("/deleteMessage", async (req, res) => {
  const { id } = req.body;
  try {
    const response = await db.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);
    if (response.rows.length > 0) {
      await db.query("DELETE FROM messages WHERE id = $1", [id]);
      res.status(200).json({ success: true, message: "Message deleted" });
    } else {
      res.status(404).json({ success: false, error: "Message not found" });
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//Server
const PORT = parseInt(process.env.PORT) || 8008;
app.listen(PORT, console.log(`Server running on port : ${PORT}`));
