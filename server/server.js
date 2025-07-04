const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRouter");
const messageRoutes = require("./routes/messageRouter");
const dbConnection = require("./utils/database");

// Middlewares
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();

// Db Connection
dbConnection(process.env.DB_URL);

//Routes
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

//Server
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running on port : ${PORT}`));
