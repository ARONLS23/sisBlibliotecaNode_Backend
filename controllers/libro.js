/* exports.getLibros = (req, res, next) =>{
    res.status(200).json( { status: 200, mensaje: 'Se procesó correctamente' } );
}

exports.getLibroById = (req, res, next) =>{
    res.status(200).json( { status: 200, mensaje: 'Se devuelve el libro por ID' } );
}

exports.crearLibro = (req, res, next) =>{
    res.status(200).json( { status: 200, mensaje: 'Se ha creado el libro correctamente' } );
}

exports.actualizarLibro = (req, res, next) =>{
    res.status(200).json( { status: 200, mensaje: 'Se actualizó el libro correctamente' } );
}

exports.eliminarLibro = (req, res, next) =>{
    res.status(200).json( { status: 200, mensaje: 'Se eliminó el libro correctamente' } );
} */
const errorResponse = require('../helper/errorResponse')
const Libro = require('../models/Libro');

exports.getLibrosAll = async (req, res, next) => {

    try {

        const libroLista = await Libro.find();

        res.status(200).json({
            status: 200,
            data: libroLista,
        });

    } catch (error) {

        next(new errorResponse('No se pudo procesar el request ' + err.message, 400));

    }

};

exports.getLibroById = async (req, res, next) => {

    try {

        const libroDataById = await Libro.findById(req.params.id);

        if (!libroDataById) {
            return next(new errorResponse('El registro no existe en la BD con este ID ' + req.params.id, 400));
        }


        res.status(200).json({
            status: 200,
            data: libroDataById,
        });

    } catch (err) {
        next(new errorResponse('El registro no existe con este ID ' + err.message, 400));
        /* err.status(400).json({
            status: 400,
            mensaje: err
        }); */
    }

};

exports.crearLibro = async (req, res, next) => {

    try {

        const libroData = await Libro.create(req.body);

        res.status(200).json({
            status: 200,
            data: libroData,
        });

    } catch (err) {
        next(new errorResponse('No es posible crear el nuevo registro ' + err.message, 400));
        /* err.status(400).json({
            status: 400,
            mensaje: err
        }); */
    }

};

exports.updateLibro = async (req, res, next) => {

    try {

        const libroDataActualizar = await Libro.findByIdAndUpdate(req.params.id, req.body);

        if (!libroDataActualizar) {
            //return res.status(400).json({status:400})
            return next(new errorResponse('El registro no existe en la BD con este ID ' + req.params.id, 400));
        }

        res.status(200).json({
            status: 200,
            data: libroDataActualizar,
        });

    } catch (err) {
        next(new errorResponse('El registro no existe con este ID ' + err.message, 400));
        /* err.status(400).json({
            status: 400,
            mensaje: err
        }); */
    }

};

exports.deleteLibro = async (req, res, next) => {

    try {

        const libroDataEliminar = await Libro.findByIdAndDelete(req.params.id);

        if (!libroDataEliminar) {
            //return res.status(400).json({status:400})
            return next(new errorResponse('El registro no existe en la BD con este ID ' + req.params.id, 400));
        }

        res.status(200).json({
            status: 200
        });

    } catch (err) {
        next(new errorResponse('El registro no existe con este ID ' + err.message, 400));
        /* err.status(400).json({
            status: 400,
            mensaje: err
        }); */
    }

};

exports.pagination = async (req, res, next) => {

    try {

        const sort = req.body.sort;
        const sortDirecction = req.body.sortDirecction;
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);

        console.log('Received request payload:', req.body);
        

        let filterValor = "";
        let filterPropiedad = "";
        let libros = [];

        let totalRow = 0;

        if (req.body.filterValue) {

            filterValor = req.body.filterValue.valor;
            filterPropiedad = req.body.filterValue.propiedad;

            libros = await Libro
                .find({
                    [filterPropiedad]: new RegExp(filterValor, "i")
                })
                .sort({
                    [sort]: sortDirecction
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            totalRow = await Libro.find({
                [filterPropiedad]: new RegExp(filterValor, "i")
            }).count();


        } else {

            libros = await Libro
                .find()
                .sort({
                    [sort]: sortDirecction
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            totalRow = await Libro.find().count();
        }

        const pagesQuantity = Math.ceil(totalRow / pageSize);

        res.status(200).json({
            status: 200,
            pageSize,
            page,
            sort,
            sortDirecction,
            pagesQuantity,
            totalRow,
            data: libros
        })

    } catch (err) {

        next(new errorResponse('El registro no existe con este ID ' + err.message, 400));

    }

}