const mongoose = require("mongoose");

const dbConnection = (db_url) => {
  mongoose
    .connect(db_url)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err + ": Error connecting to database");
    });
};

module.exports = dbConnection;
