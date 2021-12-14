const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const conexion = require('express-myconnection');
const app = express();

//IMPORTANDO RUTAS
const rutas = require('./rutas/comprador');
const rutasP = require('./rutas/producto');
const ruta = require('./rutas/comprador');
const { urlencoded } = require('express');

//settings
app.set('port',process.env.PORT || 3000); //puerto
app.set('view engine','ejs'); // indicamos que usaremos ejs como motor de plantilla
app.set('views', path.join(__dirname,'view'));


//middlewares
app.use(morgan('dev'));
app.use(conexion(mysql, {
    host:'localhost',
    user:'administrador',
    password:'administradorsql',
    port: 3306,
    database: 'crud'
},'single'));

app.use(express.urlencoded({extended:false})); //para entender todos los datos que vengan del formulario, recibe solo texto

//rutas
app.use('/',rutas);
app.use('/',rutasP);

//static files
app.use(express.static(path.join(__dirname,'public')));

//INICIANDO SERVIDOR
app.listen(app.get('port'),()=>{
    console.log('Server on port 3000');
});