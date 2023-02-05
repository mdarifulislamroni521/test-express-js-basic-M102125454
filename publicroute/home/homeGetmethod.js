// module

// custom module
const { config } = require("../../enviroment/serverEnviroment");
const { uploadUrl } = require("../../helpers/fileUpload/urlConvater");
// schema models
const { blogModel } = require("../../schemas/models");
// module scaffolding
const homeGetmethod = (req, res) => {
  blogModel
    .find({}, { user: false }, { skip: 0, limit: 20 })
    .sort("-date")
    .exec((err, blogsData) => {
      if (!err && blogsData) {
        let response = [];
        for (let blog of blogsData) {
          const picurls = uploadUrl(req, [blog.picture]);
          picture =
            typeof picurls === "object" &&
            picurls instanceof Array &&
            picurls.length > 0
              ? picurls[0]
              : null;
          const blogObj = {
            _id: blog._id,
            title: blog.title,
            description: blog.description,
            date: blog.date,
            created: blog.created,
            picture,
          };
          response.push(blogObj);
        }

        setTimeout(() => {
          res.status(200).send(response);
        }, 1000);
      } else {
        res.status(400).send({
          errMsg:
            config.port === 10000
              ? "400 bad request"
              : "something wrong to find blogs",
        });
      }
    });
};

module.exports = homeGetmethod;
