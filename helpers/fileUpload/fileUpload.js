// module
const multer = require("multer");
const path = require("path");
// custom module
const { getpath, getmaxup } = require("./fileUploadConfig");
// module scaffolding
const fileUpload = {};

// multiple file upload
fileUpload.multiple = (routeName = "") => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, getpath(routeName));
      },
      filename: (req, file, callback) => {
        const fileExt = path.extname(file.originalname);
        const filename =
          file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
          "-" +
          Date.now();
        callback(null, filename + fileExt);
      },
    }),
    limits: {
      fileSize: getmaxup(),
    },
    fileFilter: (req, file, callback) => {
      callback(null, true);
    },
  });
};

module.exports = fileUpload;
