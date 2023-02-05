// module

// custom module
const { blogModel } = require("../../schemas/models");
const { uploadUrl } = require("../../helpers/fileUpload/urlConvater");
// module scaffolding
const blogPatchmethod = (req, res) => {
  const blogId =
    typeof req.query._id === "string" && req.query._id.length > 0
      ? req.query._id
      : false;
  const picture = typeof req.file === "object" ? req.file : false;
  const title =
    typeof req.body.title === "string" && req.body.title.length > 0
      ? req.body.title
      : false;
  const description =
    typeof req.body.description && req.body.description.length > 0
      ? req.body.description
      : false;
  const date =
    typeof req.body.date === "string" ? new Date(req.body.date) : false;
  const acceptField = { picture, title, description, date };
  const updatedObj = {};
  for (let field of ["picture", "title", "description", "date"]) {
    if (acceptField[field]) {
      updatedObj[field] = acceptField[field];
    }
  }
  blogModel.findOneAndUpdate(
    { _id: blogId, user: req.user.id },
    updatedObj,
    { new: true },
    (err, updblog) => {
      if (!err && updblog) {
        const picurls = uploadUrl(req, [updblog.picture]);
        const picture =
          typeof picurls === "object" &&
          picurls instanceof Array &&
          picurls.length > 0
            ? picurls[0]
            : null;
        const blogObj = {
          _id: updblog._id,
          title: updblog.title,
          description: updblog.description,
          date: updblog.date,
          created: updblog.created,
          picture,
        };
        setTimeout(() => {
          res.status(201).send(blogObj);
        }, 1000);
      } else {
        res.status(500).send({ errMsg: "failed to update blog!" });
      }
    }
  );
};

module.exports = blogPatchmethod;
