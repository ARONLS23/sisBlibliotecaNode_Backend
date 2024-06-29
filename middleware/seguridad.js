const ErrorReponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

exports.seguridad = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorReponse("El cliente no envió el token", 400));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_WORD);
    console.log("token", decode);
    const usuarioBD = await Usuario.findOne({ userName: decode.username });
    req.usuario = usuarioBD;
    next();
  } catch (error) {
    return next(
      new ErrorReponse("Errores en el procesamiento del token" + error, 400)
    );
  }
};
