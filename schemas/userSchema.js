// module
const { Schema } = require("mongoose");

// user schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 3,
  },
  surName: {
    type: String,
    required: true,
    maxLength: 10,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    maxLength: 10,
    minLength: 5,
  },
  passWord: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  userType: {
    type: String,
    required: true,
    enum: ["basic", "vendor", "staff", "super"],
    default: "basic",
    select: false,
  },
  maxAccess: {
    type: Number,
    required: true,
    default: 1,
    select: false,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
    select: false,
  },
});

module.exports = UserSchema;
