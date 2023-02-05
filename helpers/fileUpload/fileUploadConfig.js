// module
const fs = require("fs");
const path = require("path");
// module scaffolding
const fileUploadConfig = {};

const createNestedFolder = (folder) => {
  // Check if the folder already exists
  if (!fs.existsSync(folder)) {
    // If it doesn't, create the parent folder
    createNestedFolder(path.dirname(folder));
    // Then create the folder
    fs.mkdirSync(folder);
  }
};

fileUploadConfig.getpath = (routeName = "") => {
  let uppath = "./public/static/uploads/";
  if (routeName === "v3/blog") {
    uppath = `./public/static/uploads/post/${new Date().getUTCDate()}-${
      new Date().getUTCMonth() + 1 < 10
        ? `0${new Date().getUTCMonth() + 1}`
        : new Date().getUTCMonth() + 1
    }-${new Date().getUTCFullYear()}/`;
  } else {
    uppath = `./public/static/uploads/${new Date().getUTCDate()}${
      new Date().getUTCMonth() + 1
    }-${new Date().getUTCFullYear()}${new Date().getMinutes()}/`;
  }
  const valid_Path = uppath.replace(/^\.\//, "").slice(0, -1);
  createNestedFolder(valid_Path);
  return uppath;
};

fileUploadConfig.getmaxup = () => {
  return 10000000;
};

module.exports = fileUploadConfig;
