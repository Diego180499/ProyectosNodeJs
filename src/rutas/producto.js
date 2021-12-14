const express = require('express');
const controlador = require('../controladores/ControladorProducto');

const ruta = express.Router();

ruta.post('/agregar', controlador.save);
ruta.get('/productos', controlador.listarProductos);
ruta.get('/eliminarProducto/:id',controlador.elimiar);
ruta.get('/editarProducto/:id', controlador.editar);
ruta.post('/editarProducto/:id', controlador.actualziar);
module.exports = ruta;