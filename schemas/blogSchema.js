// models
const { Schema, default: mongoose } = require("mongoose");

// blog schema
const blogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  picture: mongoose.Schema({
    originalname: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  }),
  title: {
    type: String,
    required: true,
    maxLength: 150,
    minLength: 10,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = blogSchema;
