// env modules

// env obj scaffolding
const Envobj = {};

Envobj.config = {
  port:
    typeof process.env.NODE_ENV === "string"
      ? process.env.NODE_ENV === "development"
        ? 8383
        : process.env.NODE_ENV === "production"
        ? 10000
        : 8383
      : 8383,
  tomeZone: "Asia-Bangladesh",
};

Envobj.database = {
  host: "mongodb+srv://",
  username: "md5arifulislam11roni63com58mongo75db:",
  hosturi: "@mdarifulislamroni-com.nkqmdii.mongodb.net/mdarifulislamronicom",
  password: "6U51dFnnFdK0UnD0",
  port: 1200,
};

Envobj.smtp = {
  host: "https://google.com",
  username: "username",
  password: "password",
  port: 587,
  is_secure: true,
};

module.exports = Envobj;
