const express = require('express');
const controlador = require('../controladores/ControladorComprador'); //esto es para acceder al modulo ControladorComprador

const ruta = express.Router();

ruta.get('/', controlador.list);
ruta.post('/add',controlador.save);
ruta.get('/delete/:id', controlador.delete); //el :id es el parametro que enviaremos
ruta.get('/update/:id', controlador.edit);
ruta.post('/update/:id', controlador.update);
ruta.get('/listarProductos',controlador.listarProductos);

//IMPORTANTE
module.exports = ruta; //exportamos este js a otros archivos js
