const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    nombre: String,
    plataforma: [String],
    descripcion: String,
    anio: Number,
    pegi: Number,
    estudio: String,
    generos: [String]
})

//Creamos el modelo P mayuscula importante
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
