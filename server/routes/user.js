const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authToken = require("../middlewares/authToken");
const db = require("../database");

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
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
        res
          .status(200)
          .json({ success: true, message: "Logged in successfully" });
        const data = { username: user.rows[0].username };
        const accessToken = jwt.sign(
          data,
          "Johnny Johnny Yes Papa" || process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        res.json({ accessToken });
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

// router.delete("/logout", (req, res) => {
//   try {
//   } catch (error) {
//     console.error("Error logging out user:", error);
//     res.status(500).json({ success: false, error: "Internal server error" });
//   }
// });

module.exports = router;
