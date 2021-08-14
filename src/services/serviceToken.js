import jwt from "jwt-simple";
import moment from "moment";
const secret = "SecretGeoLogystoJW";

export const crearToken = function (user) {
  var payload = {
    ...user,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, secret);
};
