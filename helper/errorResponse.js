class ErrorReponse extends Error {
    constructor(mensaje, statusCode){
        super(mensaje);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorReponse;