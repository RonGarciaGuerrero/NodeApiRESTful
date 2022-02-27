// const express = require ('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.render("pokemon", { //pokemon será el próximo fichero que creemos, AÚN NO EXISTE
//         arrayPokemon: [ //Esta información, posteriormente, VENDRÁ DE LA BASE DE DATOS
//             {id: 'pk01', nombre: 'Caterpie', tipo: 'Bicho', descripcion:'Es lamentable'},
//             {id: 'pk02', nombre: 'Weedle', tipo: 'Bicho', descripcion:'También es lamentable'},
//             {id: 'pk03', nombre: 'Magikarp', tipo: 'Agua', descripcion:'Qué cosa más mala'}
//         ]
//     })
// })



// module.exports = router;
const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const Game = require('../models/game');
const { request } = require('express');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayGameDB = await Game.find();
        console.log(arrayGameDB);
        let mensaje = null;
        if (req.query.mensaje == 'MODOK'){
            mensaje = 'La modificación se ha realizado correctamente.'
        }
        res.render("Game", { 
            arrayGame: arrayGameDB,
            mensaje : mensaje
        })
    } catch (error) {
        console.error(error)
    }
})


router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const gameDB = new Game(body) //Creamos un nuevo Pokemon, gracias al modelo
        await gameDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/game') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/crear',(req,res)=>{
    res.render('crear')//nueva vista que debemos crear
})

//PARTE DE REGISTRAR USUARIO
router.post('/register', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const db = new Usuario(body) //Creamos un nuevo Pokemon, gracias al modelo
        await db.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

//PARTE DEL LOGIN
router.get('/login', async (req, res) => {
    //const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    //console.log(body) //Para comprobarlo por pantalla
    console.log("params: " + req.query.login);
    console.log("params: " + req.query.password);
    
    try {
        //const db = new Usuario(body) //Creamos un nuevo Pokemon, gracias al modelo
        //await db.save() //Lo guardamos con .save(), gracias a Mongoose
        const usuarioDB = await Usuario.findOne({ login: req.query.login, password: req.query.password }) //_id porque así lo indica Mongo

        if (usuarioDB!=null){//req.query.login == req.query.password
            //res.redirect('/pokemon') //Volvemos al listado
            //res.send('autenticación correcta');
            const arrayGameDB = await Game.find();
            console.log(arrayGameDB);
            res.render("game", { 
                arrayGame: arrayGameDB,
                login: req.query.login
            })    
        }else{
            res.send('datos incorrectos');
        }
        
        //res.redirect('/pokemon') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
        res.json({
            estado: false,
            mensaje: 'Usuario y/o contraseña incorrecto'
        })
    }
})


router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const gameDB = await Game.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(gameDB) //Para probarlo por consola
        res.render('detalle', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            game: gameDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Juego no encontrado!'
        })
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const gameDB = await Game.findByIdAndDelete({ _id: id });
        console.log(gameDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!gameDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Juego.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Juego eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const gameDB = await Game.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(gameDB)
        res.redirect("/game?mensaje=MODOK")
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Juego'
        })
    }
})




module.exports = router;

