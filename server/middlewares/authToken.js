const jwt = require("jsonwebtoken");
const db = require("../database");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  jwt.verify(
    accessToken,
    "Johnny Johnny Yes Papa",
    async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Access Token" });
      }

      try {
        const { userId } = decodedToken;
        const userResult = await db.query("SELECT * FROM users WHERE id = $1", [
          userId,
        ]);
        const user = userResult.rows[0];

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
      } catch (error) {
        console.error("Error fetching user from database:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
};

module.exports = authToken;
