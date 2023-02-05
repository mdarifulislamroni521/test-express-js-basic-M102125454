// modules
const { config } = require("../../enviroment/serverEnviroment");
const { v3routerConfig } = require("./superRouterConfiger");
// router redirect

const routeHandler = [
  (req, res, next) => {
    const reqrouteName =
      typeof req.originalUrl === "string"
        ? req.originalUrl
            .replace(req._parsedUrl.search, "")
            .replace(/^\/+|\/+$/g, "")
        : false;

    const reqMethod =
      typeof req.method === "string" &&
      ["POST", "GET", "PATCH", "PUT", "DELETE"].indexOf(req.method) > -1
        ? req.method
        : false;
    try {
      if (v3routerConfig[reqrouteName][reqMethod].hasOwnProperty("auth")) {
        if (
          typeof v3routerConfig[reqrouteName][reqMethod].auth === "function"
        ) {
          v3routerConfig[reqrouteName][reqMethod].auth(req, res, next);
        } else {
          throw Error(
            config.port === 10000
              ? "500 -Internal Server Error"
              : "invalid authentication function"
          );
        }
      } else {
        next();
      }
    } catch {
      throw Error(
        config.port === 10000
          ? "500 -Internal Server Error"
          : "have an error to admin authentication"
      );
    }
  },
  (req, res, next) => {
    const reqrouteName =
      typeof req.originalUrl === "string"
        ? req.originalUrl
            .replace(req._parsedUrl.search, "")
            .replace(/^\/+|\/+$/g, "")
        : false;
    const reqMethod =
      typeof req.method === "string" &&
      ["POST", "GET", "PATCH", "PUT", "DELETE"].indexOf(req.method) > -1
        ? req.method
        : false;
    try {
      if (v3routerConfig[reqrouteName][reqMethod].hasOwnProperty("upload")) {
        if (
          typeof v3routerConfig[reqrouteName][reqMethod].upload === "function"
        ) {
          v3routerConfig[reqrouteName][reqMethod].upload(req, res, next);
        } else {
          throw Error(
            config.port === 10000
              ? "500 -Internal Server Error"
              : `${reqrouteName} upload function invalid`
          );
        }
      } else {
        next();
      }
    } catch {
      throw Error(
        config.port === 10000
          ? "500 -Internal Server Error"
          : `${reqrouteName} upload middleware an error`
      );
    }
  },
  (req, res, next) => {
    const reqrouteName =
      typeof req.originalUrl === "string"
        ? req.originalUrl
            .replace(req._parsedUrl.search, "")
            .replace(/^\/+|\/+$/g, "")
        : false;
    const reqMethod =
      typeof req.method === "string" &&
      ["POST", "GET", "PATCH", "PUT", "DELETE"].indexOf(req.method) > -1
        ? req.method
        : false;
    if (
      typeof v3routerConfig[reqrouteName][reqMethod].middleWare === "function"
    ) {
      v3routerConfig[reqrouteName][reqMethod].middleWare(req, res, next);
    } else {
      next();
    }
  },
];

module.exports = routeHandler;
