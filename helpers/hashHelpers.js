// modules
const bcrypt = require("bcrypt");

// hash scaffolding
const hash = {};

hash.create = async (plinText, soldRounds = 10) => {
  if (
    (typeof plinText === "string" || typeof plinText === "number") &&
    plinText.length > 0
  ) {
    try {
      const trhash = await bcrypt.hash(plinText, soldRounds);
      return trhash;
    } catch {
      throw new Error("password hash create failed");
    }
  } else {
    return false;
  }
};

hash.check = async (plinText, phash) => {
  if (
    typeof plinText === "string" &&
    typeof phash === "string" &&
    plinText.length > 0 &&
    phash.length > 0
  ) {
    const result = await bcrypt.compare(plinText, phash);
    return result === true;
  } else {
    return false;
  }
};

module.exports = hash;
