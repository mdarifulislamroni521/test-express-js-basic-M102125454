// module

// module scaffolding
const userGetmethod = (req, res) => {
  setTimeout(() => {
    res.status(200).send({ status: true });
  }, 1000);
};

module.exports = userGetmethod;
