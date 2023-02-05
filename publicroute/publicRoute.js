// module
const express = require("express");
const userRouteHandler = require("../handlers/publicHandlers/userRouteHandler");
// instances
const publicRoute = express.Router();

publicRoute.get("/", async (req, res) => {
  res.status(200).send({ message: "200 OK" });
});

publicRoute.all("/*", userRouteHandler);
module.exports = publicRoute;
