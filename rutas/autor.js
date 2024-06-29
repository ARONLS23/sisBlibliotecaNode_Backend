const express = require("express");
const ruta = express.Router();
const {seguridad} = require("../middleware/seguridad");

const {
  crearAutor,
  getAutorAll,
  getAutorById,
  updateAutor,
  deleteAutor,
  paginationAutor,
} = require("../controllers/autor");

ruta.route("/").post(seguridad, crearAutor).get(seguridad, getAutorAll);

ruta
  .route("/:id")
  .get(seguridad, getAutorById)
  .put(seguridad, updateAutor)
  .delete(seguridad, deleteAutor);

ruta.route("/pagination").post(seguridad, paginationAutor);

module.exports = ruta;
