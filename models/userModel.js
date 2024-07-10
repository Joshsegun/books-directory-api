const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please input your username"],
  },
  email: {
    type: String,
    required: [true, "Please input your email"],
    unique: true,
    validate: [validator.isEmail, "Please put a valid email"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please put your password"],
    minLength: [8, "Password must contain 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password should be the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassowrd
) {
  return await bcrypt.compare(candidatePassword, userPassowrd);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
