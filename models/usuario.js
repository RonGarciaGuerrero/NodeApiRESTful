const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    login: String,
    password: String,
})

//Creamos el modelo Usuario U mayuscula importante
const Usuario = mongoose.model('usuario', usuarioSchema, "usuario");

module.exports = Usuario;

