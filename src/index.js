"use strict";
import mongoose from "mongoose";
import app from "./app";
import { createServer } from "http";
import { config } from "./config";

// Estan constantes son para el uso de server Https
import fs from "fs";
import https from "https";

const httpServer = createServer(app);

/* Configuracion de los SSL
const privateKey  = fs.readFileSync('./ssl/appGeo.key', 'utf8');
const certificate = fs.readFileSync('./ssl/appGeo.crt', 'utf8');
const cabundle = fs.readFileSync('./ssl/appGeoCA.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate, ca: cabundle};
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3501); */

httpServer.listen(config.PORT_SERVER);

mongoose.Promise = global.Promise;
mongoose.connect(
  config.BBDD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err, _) => {
    if (err) {
      console.log("Error de conexion", err);
    } else {
      console.log("Conectado Exitosamente a Geo", config.PORT_SERVER);
    }
  }
);
