const req = require("express/lib/request");
const res = require("express/lib/response");


const controlador = {};

controlador.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM comprador', (err, compradores) => {
            if (err) {
                res.json(err);
            }
            res.render('compradores', {
                data: compradores //con data vamos a recorrer nuestro arreglo de compradores, data es nuestro objeto
            });
        });
    });
};

/*NOTA IMPORTANTE: LOS DATOS EN EL FORMULARIO SE VAN A GUARDAR CON 'name', SOLO CON 'name'
POR EJEMPLO
<input name='nombre' type='text'>*/
controlador.save = (req, res) => {
    const data = req.body;
        req.getConnection((err, conn) => {
            conn.query('INSERT INTO comprador set ?', [data], (err, comprador) => {
                console.log(comprador);
                res.redirect('/');
            });
        });
};


controlador.delete = (req, res) => {
    // req.params.id --> recuperamos el valor del parametro que enviamos en la ruta en comprador.js
    req.getConnection((err, conn) => {
        const id = req.params.id;
        conn.query('DELETE FROM comprador WHERE id = ?', id, (err, rows) => {
            res.redirect('/');
        });
    });
};

controlador.edit = (req, res) => {
    req.getConnection((err, conn) => {
        const id = req.params.id;
        conn.query('SELECT * FROM comprador WHERE id = ?', id, (err, comprador) => {
            res.render('editarComprador.ejs', {
                data: comprador[0]
            });
        });
    });
};

controlador.update = (req, res) => {
    const id = req.params.id;
    const nuevoComprador = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE comprador set ? WHERE id = ?', [nuevoComprador, id], (err, comprador) => {
            res.redirect('/');
        });
    });
};


controlador.listarProductos = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM producto', (err, productos) => {
            if (err) {
                res.json(err);
            }
            res.render('productos', {
                data: productos
            });
        });
    });
}


//IMPORTANTE
module.exports = controlador;
