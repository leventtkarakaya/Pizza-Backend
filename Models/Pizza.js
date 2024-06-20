const validator = require("validator");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Pizza = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    smallPrice: {
      type: Number,
      required: true,
    },
    mediumPrice: {
      type: Number,
      required: true,
    },
    largePrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    versionKey: false,
  }
);

module.exports = mongoose.model("Pizza", Pizza);
