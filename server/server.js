const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
const apiDetails = require("./apiDetails");

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json(apiDetails);
});

//Routes
app.use("/user", userRouter);
app.use("/message", messageRouter);

//Server
const PORT = parseInt(process.env.PORT) || 8008;
app.listen(PORT, console.log(`Server running on port : ${PORT}`));
