import express from "express";
const api = express.Router();

// -> Controladores
import {
  login,
  register,
  update,
  getCoordinates,
} from "../controllers/controllerGeo";

// -> middlewares
const { validarToken } = require("../middleware/verificacionToken");
const { joiValidation } = require("../middleware/joiValidation");

// -> schemasValidations
const { schemaLogin, schemaRegister } = require("../utils/authSchema");

// -> Routes
/** *
 * @swagger
 * tags:
 *  name: Endpoint GEO
 *
 */

/**
 * @swagger
 * api/user/register:
 *  post:
 *    summary: Resgistro de Usuarios
 *    tags: [Endpoint GEO]
 *    description: "Recibe lo siguientes parametros requerido"
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: name
 *         description: "Nombres del usuario"
 *         required: true
 *         type: string
 *       - name: lastname
 *         description: "Apellidos del usuario"
 *         required: true
 *         type: string
 *       - name: email
 *         description: "Correo del usuario"
 *         required: true
 *         type: string
 *       - name: password
 *         description: "Contraseña del usuario"
 *         required: true
 *         type: string
 *
 *    responses:
 *       200:
 *         description: "{Mesage: True}"
 */
api.post("/user/register", joiValidation(schemaRegister), register);

/**
 * @swagger
 * api/user/login:
 *  post:
 *    summary: Login de Usuarios
 *    tags: [Endpoint GEO]
 *    description: "Recibe lo siguientes parametros requerido y de ser correcto devuelve el token"
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: email
 *         description: "Correo del usuario"
 *         required: true
 *         type: string
 *       - name: password
 *         description: "Contraseña del usuario"
 *         required: true
 *         type: string
 *
 *    responses:
 *       200:
 *         description: "{TOKEN}"
 */

api.post("/auth/login", joiValidation(schemaLogin), login);
/**
 * @swagger
 * api/user/update:
 *  put:
 *    summary: Actulizar de Usuarios
 *    tags: [Endpoint GEO]
 *    description: "Enviar token   • headers {Authorization: $token} y modificar cualquier usuario"
 *    produces:
 *       - application/json
 *    parameters:
 *       - name: name
 *         description: "Nombres del usuario"
 *         required: false
 *         type: string
 *       - name: lastname
 *         description: "Apellidos del usuario"
 *         required: false
 *         type: string
 *       - name: email
 *         description: "Correo del usuario"
 *         required: false
 *         type: string
 *       - name: password
 *         description: "Contraseña del usuario"
 *         required: false
 *         type: string
 *
 *    responses:
 *       200:
 *         description: "{Mesage: True}"
 */

api.put("/user/update", validarToken, update);

/**
 * @swagger
 * api/geocode/$address:
 *  get:
 *    summary: Buscar Direcciones por los 2 Servidores
 *    tags: [Endpoint GEO]
 *    description: "Enviar token   • headers {Authorization: $token} y enviar en get la direccion a buscar el api hace la busqueda y tiene la doble validacion de los 2 servicios "
 *
 *    responses:
 *       200:
 *         description: '{"lat": 3.4767223, "lng": -76.5213648}'
 */
/**
 * @swagger
 * api/geocode/$address/1:
 *  get:
 *    summary: Buscar Direcciones solo en servidor de google
 *    tags: [Endpoint GEO]
 *    description: "Enviar token   • headers {Authorization: $token} y enviar en get la direccion a buscar luego /1 para buscar por google "
 *
 *    responses:
 *       200:
 *         description: '{"lat": 3.4767223, "lng": -76.5213648}'
 */
/**
 * @swagger
 * api/geocode/$address/2:
 *  get:
 *    summary: Buscar Direcciones solo en servidor de Tomtom
 *    tags: [Endpoint GEO]
 *    description: "Enviar token   • headers {Authorization: $token} y enviar en get la direccion a buscar luego /2 para buscar por Tomtom "
 *
 *    responses:
 *       200:
 *         description: '{"lat": 3.4767223, "lng": -76.5213648}'
 */

api.get("/geocode/:address/:api?", validarToken, getCoordinates);

export default api;
