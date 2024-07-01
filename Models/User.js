const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surName: {
      type: String,
      required: true,
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
      required: true,
      min: 6,
      max: 32,
    },
    passwordConfirm: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    versionKey: false,
  }
);
User.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model("User", User);
