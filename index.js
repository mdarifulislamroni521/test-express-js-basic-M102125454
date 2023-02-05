// dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
// config dependencies
const { config, database } = require("./enviroment/serverEnviroment");
const { uploadUrl } = require("./helpers/fileUpload/urlConvater");
// instenses
const ServerApp = express();

// custom middleware
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const internalErrorMiddleware = require("./middlewares/internalErrorMiddleware");

// instanse middleware
ServerApp.use(express.json()); //=> parse as json data
ServerApp.use(
  cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })
); //=> allow crose headers
ServerApp.use(
  "/public/static/uploads",
  express.static(path.join(__dirname, "public", "static", "uploads"))
); //=> public static

// redirect router
const publicRouter = require("./publicroute/publicRoute");
const superAdmin = require("./superadmin/superAdmin");

// routers
ServerApp.all("/", (req, res) => {
  req.res.status(404).send({ message: "invalid request" });
});

// router middleware
ServerApp.use("/v1", publicRouter);
ServerApp.use("/v3", superAdmin);

//Server Error handle
ServerApp.use(notFoundMiddleware);
ServerApp.use(internalErrorMiddleware);

// database configer
mongoose.set("strictQuery", false);
mongoose.connect(
  `${database.host}${database.username}${database.password}${database.hosturi}`,
  (err) => {
    if (!err) {
      ServerApp.listen({ port: config.port }, () => {
        console.log(`server started on port ${config.port} at ${new Date()}`);
      });
    } else {
      console.log("database connection failed!");
    }
  }
);
