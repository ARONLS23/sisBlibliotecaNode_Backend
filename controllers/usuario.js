const ErrorReponse = require("../helper/errorResponse");
const Usuario = require("../models/Usuario");

exports.registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, apellido, username, email, password } = req.body;
    const usrBD = await Usuario.create({
      nombre,
      apellido,
      userName: username,
      email,
      password,
    });

    const token = usrBD.crearJsonWebToken();

    res.status(200).json({
      status: 200,
      id: usrBD._id,
      nombre,
      apellido,
      username,
      email,
      token,
    });
  } catch (err) {
    next(new ErrorReponse("Error registrando usuario" + err, 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorReponse("Ingrese un email y un password", 400));
    }

    const usuarioBD = await Usuario.findOne({ email }).select("+password");

    if (!usuarioBD) {
      return next(new ErrorReponse("El usuario no existe en la BD", 400));
    }

    const valorBool = await usuarioBD.validarPassword(password);

    if (!valorBool) {
      return next(new ErrorReponse("Las credenciales son incorrectas", 400));
    }

    const token = usuarioBD.crearJsonWebToken();

    res.status(200).json({
      status: 200,
      id: usuarioBD._id,
      nombre: usuarioBD.nombre,
      apellido: usuarioBD.apellido,
      username: usuarioBD.userName,
      email: usuarioBD.email,
      token,
    });
  } catch (error) {
    next(new ErrorReponse("Error en el login" + error, 400));
  }
};

exports.getUsuario = async (req, res, next) => {
  try {
    const usuarioToken = req.usuario;
    const token = await usuarioToken.crearJsonWebToken();
    res.status(200).json({
      status: 200,
      id: usuarioToken._id,
      nombre: usuarioToken.nombre,
      apellido: usuarioToken.apellido,
      username: usuarioToken.userName,
      email: usuarioToken.email,
      token,
    });
  } catch (error) {
    next(new ErrorReponse("Error obteniendo la sesión del usuario" + error, 400));
  }
};
