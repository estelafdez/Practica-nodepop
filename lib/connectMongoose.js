'use strict';

const mongoose = require ('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on ('error', err =>{
    console.log ('Error de conexion a MongoDB', err);
    process.exit(1);
});

mongoose.connection.once ('open', () =>{
    console.log ('Conectado a MongoDB en', mongoose.conection.name);
});

mongoose.conect ('mongodb://127.0.0.1/nodepop');

module.exports = mongoose.connection