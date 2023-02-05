// modules
const { Schema } = require("mongoose");

// token schema
const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  accessTkn: {
    type: String,
    required: true,
    minLength: 10,
    unique: true,
  },
  refreshTkn: {
    type: String,
    required: true,
    minLength: 10,
    unique: true,
  },
  activeOTP: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * 10000 + 100000),
    minLength: 5,
    maxLength: 5,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = tokenSchema;
