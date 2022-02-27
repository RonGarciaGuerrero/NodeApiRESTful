const express = require('express')
const bodyParser=require('body-parser') //sirve para trabajar con la informacion que viaja de una pagina a otra en formato json
const app = express()
var methodOverride = require('method-override')

app.use(methodOverride('_method'))

//parse application/ x-www-form-url
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())

require('dotenv').config()
const port = process.env.PORT || 3000 //hacemos uso de las variables de entorno




// Motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Cambiar la raiz de los ficheros estáticos.

app.use(express.static(__dirname + "/public"));
//para que coja las imagenes de la carpeta img
app.use('/img',express.static(__dirname + "/img"));
//LLamada a las rutas
app.use('/',require('./router/rutas')); //la pagina por defecto 

app.use('/pokemon',require('./router/pokemon')); //todo loq ue me pidas dentro de la subruta pokemon será procesado por el fichero ./router/pokemon.js
app.use('/game',require('./router/game')); //todo loq ue me pidas dentro de la subruta pokemon será procesado por el fichero ./router/pokemon.js


//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
const user = 'ron2';
const password = 'ron2';
const dbname = 'pokemon';
const uri = `mongodb+srv://${user}:${password}@cluster0.qchrc.mongodb.net/${dbname}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))

// Tampoco va a entrar nunca porqure el directorio de ahor aes /public no es /
//por peticion de cliente GET 
//usamos funcion flecha para evtar funcoines innecesaria, obligatorio req y res, '/' es el directorio en que va a buscar localhost
// app.get('/', (req, res) => {
//     console.log(__dirname);
//     res.render("index", {titulo : "mi jeje titulo dinámico"});
// }) en las transparencias Dani dice que las corte y las peque en el rutas cambiando app por router

// ES importante mantener la estructura de carpeta, si entro en una no puedo salir y no funcionara
app.get('/contacto', (req, res) => {

    res.render("contacto", {tituloContacto : "Estamos en contacto de manera dinamica"});

})

// Poner en escucbha el servidor
app.listen(port, () => {

  console.log(`Example app listening on port ${port}`);

})

// Aquí no va a entrar nunca si no existe una carepaeta contacto en public.
app.get("/contacto", (req, res) =>{

    res.send("Estás en contacto.");

})


app.use((req,res) => {

    // res.status(404).sendFile(__dirname + "/public/404.html");
    res.status(404).render("404", {
        titulo: "Error 404", 
        descripcion: "Page not found"
    });

})

