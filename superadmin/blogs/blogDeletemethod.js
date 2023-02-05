// module

// models
const { blogModel } = require("../../schemas/models");
// module scaffolding
const blogDeletemethod = (req, res) => {
  const blogId =
    typeof req.query._id === "string" && req.query._id.length > 0
      ? req.query._id
      : false;

  blogModel.deleteOne({ _id: blogId, user: req.user.id }, (err, dlData) => {
    if (!err && dlData) {
      setTimeout(() => {
        res
          .status(200)
          .send({ Msg: "blog item successfully deleted", _id: blogId });
      }, 1000);
    } else {
      res.status(400).send({ errMsg: "Failed to delete this blog!" });
    }
  });
};

module.exports = blogDeletemethod;
