// modules
const mongoose = require("mongoose");

// schemas
const tokenSchema = require("../../schemas/tokenSchema");

// models
const tokenModel = mongoose.model("Token", tokenSchema);

// super handler scaffolding
const superAuthHandler = {};

superAuthHandler.isSuperAuthentication = (req, res, next) => {
  const accessToken =
    typeof req.headers.accesstoken === "string" &&
    req.headers.accesstoken.length > 0
      ? req.headers.accesstoken
      : false;
  if (accessToken) {
    tokenModel
      .findOne({
        accessTkn: accessToken,
      })
      .populate({
        path: "user",
        match: {
          userType: "super",
        },
        select: "-passWord -__v -created +userType",
      })
      .exec((err, tokenData) => {
        if (!err && tokenData && tokenData.user && tokenData.user.userType) {
          req.user = tokenData.user;
          next();
        } else {
          res.status(401).send({
            errMsg: "you can not action on this platform",
          });
        }
      });
  } else {
    res.status(401).send({ message: "authentication failure!" });
  }
};

module.exports = superAuthHandler;
