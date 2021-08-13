const jwt = require("jwt-simple");
const secret = "SecretGeoLogystoJW";
const moment = require("moment");

export const crearToken = function (user) {
  var payload = {
    ...user,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, secret);
};
