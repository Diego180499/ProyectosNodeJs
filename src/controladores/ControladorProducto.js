const req = require("express/lib/request");
const res = require("express/lib/response");


const controlador = {};


controlador.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO producto set ?', [data], (err, producto) => {
            console.log(producto);
            res.redirect('/productos');
        });
    });
};

controlador.listarProductos = (req,res)=>{
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM producto',(err,productos)=>{
            if(err){
                res.json(err);
            }
            res.render('productos',{
                data:productos
            });
        });
    });
}

controlador.elimiar = (req,res)=>{
    req.getConnection((err,conn)=>{
        const id = req.params.id;
        conn.query('DELETE FROM producto WHERE id = ?',id,(err,rows)=>{
            res.redirect('/productos');
        });
    });
};

controlador.editar = (req,res)=>{
    req.getConnection((err,conn)=>{
        const id = req.params.id;
        conn.query('SELECT * FROM producto WHERE id = ?',id,(err,producto)=>{
            res.render('editarProducto.ejs',{
                data : producto[0]
            });
        });
    });
};

controlador.actualziar = (req,res)=>{
    req.getConnection((err,conn)=>{
        const id = req.params.id;
        const nuevoProducto = req.body;
        conn.query('UPDATE producto set ? WHERE id = ?',[nuevoProducto,id],(err,producto)=>{
            res.redirect('/productos');
        });
    });
};

module.exports = controlador;