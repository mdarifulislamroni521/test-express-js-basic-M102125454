// ntfound module
const { config } = require("../enviroment/serverEnviroment");
// middleware scaffolding
const internalErrorMiddleware = (err, req, res, next) => {
  res.status(500).send({
    message: config.port === 10000 ? "500 Internal Server Error" : err.message,
  });
};

module.exports = internalErrorMiddleware;
