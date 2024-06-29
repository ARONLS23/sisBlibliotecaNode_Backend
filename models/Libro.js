const mongoose = require("mongoose");

const libroSchema = new mongoose.Schema({
  titulo: {
    required: [true, "Ingrese un título de libro"],
    maxlenght: [500, "El título no puede ser mayor a 500 caracteres"],
    type: String,
  },
  descripcion: String,
  precio: Number,
  fechaPublicacion: Date,
  autor: { id: String, nombreCompleto: String },
});

module.exports = mongoose.model("Libro", libroSchema);
