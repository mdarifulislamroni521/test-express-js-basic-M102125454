// module
const mongoose = require("mongoose");

// custom module
const { uploadUrl } = require("../../helpers/fileUpload/urlConvater");
// schemas
const blogSchema = require("../../schemas/blogSchema");

// models
const blogModel = mongoose.model("Blog", blogSchema);
// module scaffolding
const blogPostmethod = (req, res) => {
  const user = typeof req.user === "object" ? req.user : false;
  const picture = typeof req.file === "object" ? req.file : false;
  const title = typeof req.body.title === "string" ? req.body.title : false;
  const description =
    typeof req.body.description === "string" ? req.body.description : false;
  const date =
    typeof req.body.date === "string" && new Date(req.body.date)
      ? new Date(req.body.date)
      : false;
  if (user && picture && title && description && date) {
    blogModel.create(
      { user, picture, title, description, date },
      (err, bldata) => {
        if ((!err, bldata)) {
          const picurls = uploadUrl(req, [bldata.picture]);
          const responseData = {
            _id: bldata._id,
            picture:
              typeof picurls === "object" &&
              picurls instanceof Array &&
              picurls.length > 0
                ? picurls[0]
                : null,
            title: bldata.title,
            description: bldata.description,
            date: bldata.date,
            created: bldata.created,
          };
          res.status(201).send(responseData);
        } else {
          res.send({ errMsg: "failed to create new blog!" });
        }
      }
    );
  } else {
    const errorField = [];
    if (!picture) {
      errorField.push("picture");
    }
    if (!title) {
      errorField.push("title");
    }
    if (!description) {
      errorField.push("description");
    }
    if (!date) {
      errorField.push("date");
    }
    res.status(400).send({
      errMsg: "sorry! invalid request make sure all requirements field valid",
      errorField,
    });
  }
};

module.exports = blogPostmethod;
