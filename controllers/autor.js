const errorResponse = require ('../helper/errorResponse')
const Autor = require('../models/Autor');


exports.crearAutor = async (req, res, next) => {

    try {

        const autorData = await Autor.create(req.body);

        res.status(200).json({
            status: 200,
            data: autorData,
        });

    } catch (err) {
        next(new errorResponse ('No es posible crear el autor ' + err.message, 404));
        /* err.status(400).json({
            status: 400,
            mensaje: err
        }); */
    }

};

exports.getAutorAll = async (req, res, next) => {

    try {

        const autorListaData = await Autor.find();

        res.status(200).json({
            status: 200,
            data: autorListaData,
        });

    } catch (err) {
        next(new errorResponse ('No es pudo procesar el request ' + err.message, 404));
        /* err.status(400).json({
            status: 400,
            mensaje: err
        }); */
    }

};

exports.getAutorById = async (req, res, next) => {

    try {

        const autorDataById = await Autor.findById(req.params.id);

        if(!autorDataById){
            return next(new errorResponse ('El autor no existe en la BD con este ID ' + req.params.id, 404));
        }

        res.status(200).json({
            status: 200,
            data: autorDataById,
        });

    } catch (err) {
        next(new errorResponse ('El autor no existe con este ID ' + req.params.id, 404));
        /* err.status(400).json({
            status: 400,
            mensaje: err
        }); */
    }

};

exports.updateAutor = async (req, res, next) => {

    try {

        const autorDataActualizar = await Autor.findByIdAndUpdate(req.params.id, req.body);

        if(!autorDataActualizar){
            //return res.status(400).json({status:400})
            return next(new errorResponse ('El autor no existe en la BD con este ID ' + req.params.id, 404));
        }

        res.status(200).json({
            status: 200,
            data: autorDataActualizar,
        });

    } catch (err) {
        next(new errorResponse ('El autor no existe con este ID ' + req.params.id, 404));
        /* err.status(400).json({
            status: 400,
            mensaje: err
        }); */
    }

};

exports.deleteAutor = async (req, res, next) => {

    try {

        const autorDataEliminar= await Autor.findByIdAndDelete(req.params.id);

        if(!autorDataEliminar){
            //return res.status(400).json({status:400})
            return next(new errorResponse ('El autor no existe en la BD con este ID ' + req.params.id, 404));
        }

        res.status(200).json({
            status: 200
        });

    } catch (err) {
        next(new errorResponse ('El autor no existe con este ID ' + req.params.id, 404));
        /* err.status(400).json({
            status: 400,
            mensaje: err
        }); */
    }

}

exports.paginationAutor = async (req, res, next) => {

    try {

        const sort = req.body.sort;
        const sortDirecction = req.body.sortDirecction;
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);

        console.log('Received request payload:', req.body);
        

        let filterValor = "";
        let filterPropiedad = "";
        let personas = [];

        let totalRow = 0;

        if (req.body.filterValue) {

            filterValor = req.body.filterValue.valor;
            filterPropiedad = req.body.filterValue.propiedad;

            personas = await Autor
                .find({
                    [filterPropiedad]: new RegExp(filterValor, "i")
                })
                .sort({
                    [sort]: sortDirecction
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            totalRow = await Autor.find({
                [filterPropiedad]: new RegExp(filterValor, "i")
            }).count();


        } else {

            personas = await Autor
                .find()
                .sort({
                    [sort]: sortDirecction
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            totalRow = await Autor.find().count();
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
            data: personas
        })

    } catch (err) {

        next(new errorResponse('El registro no existe con este ID ' + err.message, 400));

    }

}