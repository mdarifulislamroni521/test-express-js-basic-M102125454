// mosule
const { isSuperAuthentication } = require("./superAuthHandler");

// router processor
const UserPostMethod = require("../../superadmin/users/userPostmethod");
const userGetmethod = require("../../superadmin/users/userGetmethod");
const blogPostmethod = require("../../superadmin/blogs/blogPostmethod");
const blogGetmethod = require("../../superadmin/blogs/blogGetmethod");
const blogPatchmethod = require("../../superadmin/blogs/blogPatchmethod");
const blogDeletemethod = require("../../superadmin/blogs/blogDeletemethod");
// middlewares
const { multiple } = require("../../helpers/fileUpload/fileUpload");

// super scaffolding
const superRouterConfig = {};

superRouterConfig.v3routerConfig = {
  "v3/user": {
    POST: {
      middleWare: UserPostMethod,
    },
    GET: {
      middleWare: userGetmethod,
      auth: isSuperAuthentication,
    },
  },
  "v3/blog": {
    POST: {
      middleWare: blogPostmethod,
      auth: isSuperAuthentication,
      upload: multiple("v3/blog").single("picture"),
    },
    GET: {
      middleWare: blogGetmethod,
      auth: isSuperAuthentication,
    },
    PATCH: {
      middleWare: blogPatchmethod,
      auth: isSuperAuthentication,
      upload: multiple("v3/blog").single("picture"),
    },
    DELETE: {
      middleWare: blogDeletemethod,
      auth: isSuperAuthentication,
    },
  },
};

module.exports = superRouterConfig;
