// modules
const { config } = require("../../enviroment/serverEnviroment");
const hash = require("../../helpers/hashHelpers");

// models
const { userModel } = require("../../schemas/models");
const { tokenModel } = require("../../schemas/models");

const UserPostMethod = async (req, res) => {
  const findallsuper = await userModel.find(
    { userType: "super" },
    { __v: true, _id: false }
  );

  const userName =
    typeof req.body.userName === "string" &&
    req.body.userName.length >= 3 &&
    req.body.userName.length <= 10
      ? req.body.userName
      : false;
  const plinpassWord =
    typeof req.body.passWord === "string" && req.body.passWord.length >= 6
      ? req.body.passWord
      : false;
  if (findallsuper.length > 0) {
    if (userName && plinpassWord) {
      userModel.findOne(
        { userType: "super", userName: userName },
        { __v: true, _id: true, passWord: true },
        async (err2, userData) => {
          if (!err2) {
            try {
              const checkPass = await hash.check(
                plinpassWord,
                userData.passWord
              );
              if (checkPass == true) {
                const accessTkn = await hash.create(
                  `${new Date().getTime()}${
                    Math.random() * 100099 + 51225545542222
                  }`,
                  12
                );
                const refreshTkn = await hash.create(
                  `${new Date().getTime() * Math.random() * 125645}${
                    Math.random() * 521255125 + 51225545542222
                  }`,
                  12
                );
                tokenModel.create(
                  { user: userData._id, accessTkn, refreshTkn },
                  (err3, creuserData) => {
                    if (!err3) {
                      tokenModel.deleteMany(
                        {
                          user: creuserData.user,
                          accessTkn: { $ne: creuserData.accessTkn },
                          refreshTkn: { $ne: creuserData.refreshTkn },
                        },
                        (uperr, uptkstatus) => {
                          if (!uperr && uptkstatus) {
                            console.log("old token delete success");
                          } else {
                            console.log("old tokns delete failed");
                          }
                        }
                      );
                      res.status(200).send({
                        access: creuserData.accessTkn,
                        refresh: creuserData.refreshTkn,
                      });
                    } else {
                      res.status(500).send({
                        errMsg:
                          config.port === 10000
                            ? "Token create error"
                            : "500 Internal server Error",
                      });
                    }
                  }
                );
              } else {
                res.status(403).send({
                  errMsg:
                    config.port === 10000
                      ? "Username or password not match"
                      : "password and hash not match!",
                });
              }
            } catch {
              res
                .status(500)
                .send({ errMsg: "username or password not match" });
            }
          } else {
            res.status(403).send({
              errMsg:
                config.port === 10000
                  ? "Username or password not match"
                  : "User doesn't exist",
            });
          }
        }
      );
    } else {
      res.status(404).send({
        message:
          config.port === 10000 ? "404 not found" : "Already have an super",
      });
    }
  } else {
    if (findallsuper.length < 1) {
      let errorMessage = {};
      const firstName =
        typeof req.body.firstName === "string" &&
        req.body.firstName.length >= 3 &&
        req.body.firstName.length <= 20
          ? req.body.firstName
          : false;
      const surName =
        typeof req.body.surName === "string" && req.body.surName.length <= 10
          ? req.body.surName
          : false;
      const userType = "super";
      const passWord =
        typeof req.body.passWord === "string" && req.body.passWord.length >= 6
          ? await hash.create(req.body.passWord)
          : false;
      if (firstName && userName && surName && passWord) {
        userModel.create(
          { firstName, surName, userName, userType, passWord },
          (err) => {
            if (!err) {
              res.status(201).send({ message: "super user create success" });
            } else {
              res.status(404).send({
                message:
                  config.port === 10000
                    ? "super user create failed"
                    : err.message,
              });
            }
          }
        );
      } else {
        if (!firstName) {
          errorMessage.firstName = "firstName minimum 3-20 charators";
        }
        if (!surName) {
          errorMessage.surName = "surName maximum 10 charators";
        }
        if (!userName) {
          errorMessage.userName = "userName maximum 3-10 charators";
        }
        if (!passWord) {
          errorMessage.passWord = "passWord minimum 6 charators";
        }
        res.status(400).send({ errMsg: errorMessage });
      }
    } else {
      res.status(500).send({ errMsg: "already exist an account" });
    }
  }
};

module.exports = UserPostMethod;
