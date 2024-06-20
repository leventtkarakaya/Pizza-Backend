const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB = process.env.MONGO_URI;

const DataBase = () => {
  mongoose
    .connect(DB, {
      dbName: "PizzaRestaurant",
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = DataBase;
