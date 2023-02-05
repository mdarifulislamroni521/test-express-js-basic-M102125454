// mosule
const { isUserAuthentication } = require("./userAuthHandler");

// router processor
const homeGetmethod = require("../../publicroute/home/homeGetmethod");

// super scaffolding
const userRouterConfig = {};

userRouterConfig.v1routerConfig = {
  "v1/home": {
    GET: {
      middleWare: homeGetmethod,
    },
  },
};

module.exports = userRouterConfig;
