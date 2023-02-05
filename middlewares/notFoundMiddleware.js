// ntfound module

// middleware scaffolding
const notFoundMiddleware = (req, res, next) => {
  res.status(404).send({ message: "404 not found" });
};

module.exports = notFoundMiddleware;
