// module
const mongoose = require("mongoose");

// schemas
const userSchema = require("./userSchema");
const tokenSchema = require("./tokenSchema");
const blogSchema = require("./blogSchema");
// module scaffolding
const models = {};
// db models
models.userModel = mongoose.model("User", userSchema);
models.tokenModel = mongoose.model("Token", tokenSchema);
models.blogModel = mongoose.model("Blog", blogSchema);

module.exports = models;
