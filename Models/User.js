const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserAdress = new mongoose.Schema(
  {
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    neighbourhood: {
      type: String,
    },
    apartment: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Email adresi gecersiz.",
      },
    },
    password: {
      type: String,
      min: 6,
      max: 32,
    },
    passwordConfirm: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    adress: [UserAdress],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

module.exports = mongoose.model("User", User, "users");
