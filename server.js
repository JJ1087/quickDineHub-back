'use strict'
//llamamos a las rutas
const cors = require('cors');
const authRoutes =require('./auth/auth.routes');
const express = require('express');
const properties = require('./config/properties.js');
const DB = require('./config/db.js'); //llamar a la base de datos


 DB();//init DB

const app= express();
//arrancar las rutas
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

//medidas de seguridad
app.use(cors());//podemos utilizar cors para especificar que dominios pueden tener acceso a nuestro back, en este momento esta abierto para todos

app.use('/api', router);
authRoutes(router);

router.get('/', (req, res) => {
    res.send('hola desde el home')
});

router.get('/mensaje', (req, res) => {
    res.send('camaron');
});


app.use(router);

console.log(properties)

const PORT =  properties.PORT || 3300;

app.listen(PORT, () => console.log(`El servidor esta corriendo en el puerto ${PORT}`));