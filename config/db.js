const mongoose = require('mongoose');

const connectDataBase = async() =>{
    const conexion = await mongoose.connect(process.env.MONGO_URL, {
        //useNewUrlParser: true,
        //useCreateIndex: true,
        //useFindAndModify: false,
        //useUniFiedTopology: true
    });

    console.log('MongoDB servidor atlas conectado', conexion.connection.host);
}

module.exports = connectDataBase;

