const express = require('express') //Requerimos Express
const router = express.Router();

// Ahora, CORTAMOS del fichero principal 01-express.js
// las dos rutas que tenemos: la principal ( / ) y la 
// de contactos ( /contaco )
// Importante que ya no usaremos el app.get(...), ahora
//vamos a utilizar las rutas, por lo que deberemos poner:
router.get('/', (req, res) => {
    res.render("index", { titulo: "VideoGames DB", contenido: "Bienvenido a la base de datos de VideoGames.Desde aquí podrás consultar los juegos que tenemos guardados, además podrás añadir juegos nuevos. Si ya te has registrado previamente se puede acceder a traves de la seccion 'Login', si no te has registrado entonces debes hacer click en 'Registro'." })
})

router.get('/contacto', (req, res) => {
    res.render("contacto", { tituloContacto: "Contacta con nosotros", correo: "ronaldgarcia.20@campuscamara.es", telefono: "657909134", web: "https://rongarciaguerrero.github.io/" })
})

router.get('/register', (req, res) => {
    res.render("register", {error: ''})
})

router.get('/login', (req, res) => {
    res.render("login", {error: ''})
})

// Por último, vamos a exportarlo:
module.exports = router;

