// module
const express = require("express");
const superRouteHandler = require("../handlers/superHandlers/superRouteHandler");
// instances
const SuperAdmin = express.Router();

SuperAdmin.get("/", async (req, res) => {
  res.status(200).send({ message: "200 OK" });
});

SuperAdmin.all("/*", superRouteHandler);
module.exports = SuperAdmin;
