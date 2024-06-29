const express = require("express");
const {seguridad} = require("../middleware/seguridad");
const ruta = express.Router();
const {
  getUsuario,
  registrarUsuario,
  login,
} = require("../controllers/usuario");

ruta.get("/", seguridad, getUsuario);

ruta.post("/registrar", registrarUsuario);

ruta.post("/login", login);

module.exports = ruta;
