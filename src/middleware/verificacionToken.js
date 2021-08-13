const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "SecretGeoLogystoJW";

export const validarToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "la peticion  no tiene cabeceara de autenticacion" });
  }
  var token = req.headers.authorization;
  try {
    var payload = jwt.decode(token, secret);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "token ha vencido" });
    }
  } catch (ex) {
    return res.status(404).send({ message: "El token no es valido" });
  }

  req.user = payload;
  next();
};
