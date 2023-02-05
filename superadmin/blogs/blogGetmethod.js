// module

// custom module
const { uploadUrl } = require("../../helpers/fileUpload/urlConvater");
// schema model
const { blogModel } = require("../../schemas/models");
// module scaffolding
const blogGetmethod = (req, res) => {
  const rqpage =
    typeof req.query.page === "string" &&
    !isNaN(Number(req.query.page)) &&
    Number.isInteger(Number(req.query.page))
      ? Number(Number(req.query.page))
      : 1;
  const keyword =
    typeof req.query.kw === "string" && req.query.kw.length > 0
      ? req.query.kw
      : false;

  const contentPerpage = 4;

  const regex = new RegExp(
    `\\b(${keyword ? keyword.split(" ").join("|") : ""})\\b`,
    "ig"
  );

  blogModel
    .find(
      {
        title: {
          $regex: regex,
        },
      },
      { user: false, __v: false },
      { skip: rqpage * contentPerpage, limit: contentPerpage }
    )
    .sort("-date")
    .exec((err, blogs) => {
      if (!err && blogs) {
        const response = {
          data: [],
          totalPage: 0,
          currentPage: rqpage,
          prevPage: 0,
          nextPage: 0,
        };
        blogModel
          .find({
            title: {
              $regex: regex,
            },
          })
          .count(function (err, count) {
            if (!err && count) {
              response.totalPage = Math.ceil(count / contentPerpage);
              response.prevPage = rqpage > 0;
              response.nextPage = response.totalPage > rqpage + 1;
              for (let blog of blogs) {
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
                response.data.push(blogObj);
              }

              setTimeout(() => {
                res.status(200).send(response);
              }, 1000);
            } else {
              res.status(400).send("total count failed");
            }
          });
      } else {
        res.status(400).send("blog find error !");
      }
    });
};

module.exports = blogGetmethod;
