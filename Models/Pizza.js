const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Pizza = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    smallPrice: {
      type: String,
      required: true,
    },
    mediumPrice: {
      type: String,
      required: true,
    },
    largePrice: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

module.exports = mongoose.model("Pizza", Pizza);
