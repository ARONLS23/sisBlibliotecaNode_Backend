const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Por favor ingrese un nombre"],
  },
  apellido: {
    type: String,
    required: [true, "Por favor ingrese el apellido"],
  },
  userName: {
    type: String,
    required: [true, "Por favor ingrese un unsername"],
  },
  email: {
    type: String,
    required: [true, "Por favor ingrese un email"],
    unique: true,
    match: [
      /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
      "Ingrese un email valido",
    ],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese un password"],
    minlength: 6,
    select: false,
  },
});
//Encriptar Constraseña
UsuarioSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});
//Json Web Token
UsuarioSchema.methods.crearJsonWebToken = function () {
  return jwt.sign({ username: this.userName }, process.env.JWT_SECRET_WORD, {
    expiresIn: process.env.JWT_EXPIRE
  });
};
//Validar Password
UsuarioSchema.methods.validarPassword = async function (passwordUsuario) {
  return await bcrypt.compare(passwordUsuario, this.password);
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
