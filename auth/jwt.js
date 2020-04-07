const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "ohf#2)}-67cwikl&299";

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

function toData(token) {
  return jwt.verify(token, secret);
}

module.exports = { toJWT, toData };
