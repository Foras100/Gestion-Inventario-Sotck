var express = require('express');
var app=express();
var multer=require('multer');
var upload= multer();
var bodyparser=require('body-parser');

//Importamos sequelize
var Sequelize=require('sequelize');
var sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/Laboratorio2018")

var cliente= sequelize.define("cliente",{
    nombre: {type: Sequelize.STRING},
    direccion:{type: Sequelize.STRING},
    dni:{type: Sequelize.BIGINT}//ademas de esto se le agrega autom. id, cuando se creo el objeto y cuando se modifico
});
var factura=sequelize.define("factura",{
    fecha:{type: Sequelize.DATE},
    nro_sucursal:{type: Sequelize.INTEGER},
    nro_correlativo:{type: Sequelize.INTEGER},
    tipo: {type: Sequelize.STRING},
    id_proveedor:{type: Sequelize.INTEGER},
    id_cliente:{type: Sequelize.INTEGER},
    total:{type: Sequelize.DOUBLE}
});
var factura_item=sequelize.define("factura_item",{
    id_factura:{type: Sequelize.INTEGER},
    id_articulo:{type: Sequelize.INTEGER},
    cantidad:{type: Sequelize.INTEGER},
    precio_compra:{type: Sequelize.DOUBLE},
    precio_venta:{type: Sequelize.DOUBLE},

    codigo_articulo:{type: Sequelize.INTEGER},
    nombre_articulo:{type: Sequelize.STRING},
    iva:{type: Sequelize.DOUBLE},
    subtotal:{type: Sequelize.DOUBLE}
});
var articulo=sequelize.define("articulo",{
    id_proveedor:{type: Sequelize.INTEGER},
    codigo:{type: Sequelize.INTEGER},
    nombre: {type: Sequelize.STRING},
    descripcion: {type: Sequelize.STRING},
    id_rubro:{type: Sequelize.INTEGER},
    precio_compra:{type: Sequelize.DOUBLE},
    precio_venta:{type: Sequelize.DOUBLE},
    stock:{type: Sequelize.INTEGER},
    iva:{type: Sequelize.NUMERIC}
});
var proveedor = sequelize.define("proveedor",{
    nombre: {type: Sequelize.STRING},
    cuit:{type: Sequelize.BIGINT},
    direccion:{type: Sequelize.STRING}
},{tableName:"proveedores"});

var rubro = sequelize.define("rubro",{
    nombre: {type: Sequelize.STRING},
    descripcion:{type: Sequelize.STRING},
    ubicacion: {type: Sequelize.STRING}
});

//Sincronizamos sequelize con la DB
sequelize.sync({alter:true}).then(()=>console.log("todas las tablas creadas"))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload.array());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });


app.listen(3001,function(){
    console.log("servicor funcionando!")
})

//Relaciones de tablas
// cliente.hasMany(factura,{foreignKey:"id_cliente"});

// proveedor.hasMany(factura,{foreignKey:"id_proveedor"});

// proveedor.hasMany(articulo,{foreignKey:"id_proveedor"});

// rubro.hasMany(articulo,{foreignKey:"id_rubro"});

// articulo.hasMany(factura_item,{foreignKey:"id_articulo"});

// factura.hasMany(factura_item,{foreignKey:"id_factura"});



//------------------------END POINTS------------------------//

//Cliente
app.get('/clientes',function(req,res){
    //console.log("Get de clientes");
    cliente.findAll().then((cl)=>{
        res.send(cl);
    })
})
app.get('/clientes/:id',function(req,res){
    //console.log("Get de cliente con id: "+req.param.id);
    var _id=req.params.id;
    cliente.findById(_id).then((cl)=>{
        res.send(cl);
    })
})
app.post('/cliente',function(req,res){
    //console.log("Post de cliente");
    var _nombre=req.body.nombre;
    var _dni=req.body.dni;
    var _direccion=req.body.direccion;
    cliente.create({nombre:_nombre,dni:_dni,direccion:_direccion})
    .then((cl)=>{
        res.send(cl);
    })
})
app.put('/cliente/:id',function(req,res){
    //console.log("Put de cliente con id: ");
    var _nombre=req.body.nombre;
    var _dni=req.body.dni;
    var _direccion=req.body.direccion;
    var _id=req.params.id;
    cliente.update({nombre:_nombre,dni:_dni,direccion:_direccion}
        ,{ where:{id:_id}}).then((cl)=>{
            res.send(cl);
        })
})
app.delete('/cliente/:id',function(req,res){
    //console.log("Delete de cliente con id: ");
    cliente.destroy({where:{id:req.params.id}})
    .then(response => res.json(response))
})


//Rubro
app.get('/rubros',function(req,res){
    //console.log("Get de rubros");
    rubro.findAll().then((r)=>{
        res.send(r);
    })
})
app.get('/rubros/:id',function(req,res){
    //console.log("Get de rubro con id");
    rubro.findById(req.params.id).then((r)=>{
        res.send(r);
    })
})
app.post('/rubro',function(req,res){
    //console.log("Post de rubro");
    var _nombre=req.body.nombre;
    var _descripcion=req.body.descripcion;
    var _ubicacion=req.body.ubicacion;
    rubro.create({nombre:_nombre,descripcion:_descripcion,ubicacion:_ubicacion})
    .then((r)=>{
        res.send(r);
    })
})
app.put('/rubro/:id',function(req,res){
    //console.log("Put de rubro con id: ");
    var _nombre=req.body.nombre;
    var _descripcion=req.body.descripcion;
    var _ubicacion=req.body.ubicacion;
    rubro.update({nombre:_nombre,descripcion:_descripcion,ubicacion:_ubicacion},
        {where:{id:req.params.id}})
    .then((r)=>{
        res.send(r);
    })
})
app.delete('/rubro/:id',function(req,res){
    //console.log("Delete de rubro con id: ");
    rubro.destroy({where:{id:req.params.id}})
    .then(response => res.json(response))
})


//Proveedor
app.get('/proveedores',function(req,res){
    //console.log("Get de proveedores");
    proveedor.findAll().then((pr)=>{
        res.send(pr);
    })
})
app.get('/proveedores/:id',function(req,res){
    //console.log("Get de proveedores con id: ");
    proveedor.findById(req.params.id).then((pr)=>{
        res.send(pr);
    })
})
app.post('/proveedor',function(req,res){
    //console.log("Post de proveedor");
    var _nombre=req.body.nombre;
    var _cuit=req.body.cuit;
    var _direccion=req.body.direccion;
    proveedor.create({nombre:_nombre,cuit:_cuit,direccion:_direccion})
    .then((pr)=>{
        res.send(pr);
    })
})
app.put('/proveedor/:id',function(req,res){
    //console.log("Put de proveedor con id: "+req.param.id);
    var _nombre=req.body.nombre;
    var _cuit=req.body.cuit;
    var _direccion=req.body.direccion;
    proveedor.update({nombre:_nombre,cuit:_cuit,direccion:_direccion},
        {where:{id:req.params.id}})
    .then((pr)=>{
        res.send(pr);
    })
})
app.delete('/proveedor/:id',function(req,res){
    //console.log("Delete de proveedor con id: "+req.param.id);
    proveedor.destroy({where:{id:req.params.id}})
    .then(response => res.json(response))
})


//Factura
app.get('/facturas_compra',function(req,res){
    //console.log("Get de facturas");
    factura.findAll({where:{id_cliente:null}}).then((f)=>{
        res.send(f);
    })
})
app.get('/facturas_venta',function(req,res){
    //console.log("Get de facturas");
    factura.findAll({where:{id_proveedor:null}}).then((f)=>{
        res.send(f);
    })
})
app.get('/facturas/:id',function(req,res){
    //console.log("Get de facturas con id: "+req.param.id);
    factura.findById(req.params.id).then((f)=>{
        res.send(f);
    })
})
app.post('/factura',function(req,res){
    //console.log("Post de factura");
    var _fecha=req.body.fecha;
    var _nro_sucursal=req.body.nro_sucursal;
    var _nro_correlativo=req.body.nro_correlativo;
    var _tipo=req.body.tipo;
    var _id_proveedor=req.body.id_proveedor;
    var _id_cliente=req.body.id_cliente;
    var _total=req.body.total;
    factura.create({fecha:_fecha,nro_sucursal:_nro_sucursal,
        nro_correlativo:_nro_correlativo,tipo:_tipo,id_cliente:_id_cliente,
        id_proveedor:_id_proveedor,total:_total})
        .then((f)=>{
            res.send(f);
        })
})
// app.put('/factura/:id',function(req,res){
//     //console.log("Put de factura con id: "+req.param.id);
//     var _fecha=req.body.fecha;
//     var _nro_sucursal=req.body.nro_sucursal;
//     var _nro_correlativo=req.body.nro_correlativo;
//     var _tipo=req.body.tipo;
//     var _id_proveedor=req.body._id_proveedor;
//     var _id_cliente=req.body._id_cliente;
//     factura.update({fecha:_fecha,nro_sucursal:_nro_sucursal,
//         nro_correlativo:_nro_correlativo,tipo:_tipo,id_cliente:_id_cliente,
//         id_proveedor:_id_proveedor},{where:{id:req.params.id}})
//         .then((f)=>{
//             res.send(f);
//         })
// })
//NO PARECE CORRECTO PODER MODIFICAR UNA FACTURA
app.delete('/factura/:id',function(req,res){
    //console.log("Delete de factura con id: "+req.param.id);
    factura.destroy({where:{id:req.params.id}})
    .then(response => res.json(response))
})



//Articulo
app.get('/articulos',function(req,res){
    //console.log("Get de articulos");
    articulo.findAll().then((ar)=>{
        res.send(ar);
    })
})
app.get('/articulos/:id',function(req,res){
    //console.log("Get de articulos con id: "+req.param.id);
    articulo.findById(req.params.id).then((ar)=>{
        res.send(ar);
    })
})
app.post('/articulo',function(req,res){
    //console.log("Post de articulo");
    var _id_proveedor=req.body.id_proveedor;
    var _codigo=req.body.codigo;
    var _nombre=req.body.nombre;
    var _descripcion=req.body.descripcion;
    var _id_rubro=req.body.id_rubro;
    var _precio_compra=req.body.precio_compra;
    var _precio_venta=req.body.precio_venta;
    var _stock=req.body.stock;
    var _iva=req.body.iva;
    articulo.create({id_proveedor:_id_proveedor,codigo:_codigo,
        nombre:_nombre,descripcion:_descripcion,
        id_rubro:_id_rubro,precio_compra:_precio_compra,
        precio_venta:_precio_venta,stock:_stock,iva:_iva})
        .then((ar)=>{
            res.send(ar);
        })
})
app.put('/articulo/:id',function(req,res){
    //console.log("Put de articulo con id: "+req.param.id);
    var _id_proveedor=req.body.id_proveedor;
    var _codigo=req.body.codigo;
    var _nombre=req.body.nombre;
    var _descripcion=req.body.descripcion;
    var _id_rubro=req.body.id_rubro;
    var _precio_compra=req.body.precio_compra;
    var _precio_venta=req.body.precio_venta;
    var _stock=req.body.stock;
    var _iva=req.body.iva;
    articulo.update({id_proveedor:_id_proveedor,codigo:_codigo,
        nombre:_nombre,descripcion:_descripcion,
        id_rubro:_id_rubro,precio_compra:_precio_compra,
        precio_venta:_precio_venta,stock:_stock,iva:_iva},
        {where:{id:req.params.id}})
        .then((ar)=>{
            res.send(ar);
        })
})
app.delete('/articulo/:id',function(req,res){
    //console.log("Delete de articulo con id: "+req.param.id);
    articulo.destroy({where:{id:req.params.id}})
    .then(response => res.json(response))
})



//Factura_item
app.get('/facturas_item/:id',function(req,res){
    //console.log("Get de articulos");
    var _id_factura=req.params.id;
    factura_item.findAll({where:{id_factura:_id_factura}}).then((fit)=>{
        res.send(fit); // Retorna todos los items de una factura no veo necesario un get con TODOS los items de TODAS las facturas
    });
})
app.get('/factura_item/:id',function(req,res){
    //console.log("Get de articulos con id: "+req.param.id);
    factura_item.findById(req.params.id).then((fit)=>{
        res.send(fit);
    })
})
app.post('/factura_item_venta',function(req,res){
    var _id_factura=req.body.id_factura;
    var _id_articulo=req.body.id_articulo;
    var _cantidad=req.body.cantidad;

    var _precio_compra=req.body.precio_compra;
    var _codigo_articulo=req.body.codigo_articulo;
    var _nombre_articulo=req.body.nombre_articulo;
    var _iva=req.body.iva;
    var _subtotal=req.body.subtotal;

    factura_item.create({id_factura:_id_factura,
        id_articulo:_id_articulo,cantidad:_cantidad,precio_compra:_precio_compra,codigo_articulo:_codigo_articulo,nombre_articulo:_nombre_articulo,
        iva:_iva,subtotal:_subtotal})
        .then((fit)=>{
            articulo.findById(_id_articulo)
            .then(ar=>{
                articulo.update({stock:(ar.stock-_cantidad)},{where:{id:ar.id}})
                .then(()=>{
                    res.send(fit);
                })
            })
        });
})
app.post('/factura_item_compra',function(req,res){
    var _id_factura=req.body.id_factura;
    var _id_articulo=req.body.id_articulo;
    var _cantidad=req.body.cantidad;
    
    var _precio_compra=req.body.precio_compra;
    var _codigo_articulo=req.body.codigo_articulo;
    var _nombre_articulo=req.body.nombre_articulo;
    var _iva=req.body.iva;
    var _subtotal=req.body.subtotal;
    
    factura_item.create({id_factura:_id_factura,
                id_articulo:_id_articulo,cantidad:_cantidad,precio_compra:_precio_compra,codigo_articulo:_codigo_articulo,nombre_articulo:_nombre_articulo,
                iva:_iva,subtotal:_subtotal})
                .then((fit)=>{
                    articulo.findById(_id_articulo)
                    .then(ar=>{
                        articulo.update({stock:(ar.stock+_cantidad)},{where:{id:ar.id}})
                        .then(()=>{
                            res.send(fit);
                        })
                    })
                });
})
// app.post('/factura_item_compra',function(req,res){
//     var _id_factura=req.body.id_factura;
//     var _id_articulo=req.body.id_articulo;
//     var _cantidad=req.body.cantidad;
//     var _precio_compra=req.body.precio_compra;
//     var _precio_venta=req.body.precio_venta;
//     factura_item.create({id_factura:_id_factura,
//         id_articulo:_id_articulo,cantidad:_cantidad,precio_compra:_precio_compra,
//         precio_venta:_precio_venta})
//         .then((fit)=>{
//             var precio_compra_anterior;
//             var precio_venta_anterior;
//             var _stock;
//             articulo.findById(_id_articulo).then((ar)=>{
//                 this.precio_compra_anterior=ar.precio_compra;
//                 this.precio_venta_anterior=ar.precio_venta;
//                 _stock=ar.stock;
//                 var ppp_compra=(precio_compra_anterior+_precio_compra)/2;
//             var ppp_venta=(precio_venta_anterior+_precio_venta)/2;
//             _stock=_stock+_cantidad;
//             articulo.update({precio_compra:ppp_compra,precio_venta:ppp_venta,stock:_stock})
//             .then();
//             });
            // var ppp_compra=(precio_compra_anterior+_precio_compra)/2;
            // var ppp_venta=(precio_venta_anterior+_precio_venta)/2;
            // _stock=_stock+_cantidad;
            // articulo.update({precio_compra:ppp_compra,precio_venta:ppp_venta,stock:_stock});
            // res.send(fit);
//         })
//         res.send();
// })
// app.put('/factura_item/:id',function(req,res){
//     //console.log("Put de articulo con id: "+req.param.id);
//     var _id_factura=req.body.id_factura;
//     var _id_articulo=req.body.id_articulo;
//     var _cantidad=req.body.cantidad;
//     var _precio=req.body.precio;
//     factura_item.update({id_factura:_id_factura,
//         id_articulo:_id_articulo,cantidad:_cantidad,precio:_precio},
//         {where:{id:req.params.id}})
//         .then((fit)=>{
//             res.send(fit);
//         })
// })
//NO PARECE CORRECTO PODER MODIFICAR UN ITEM DE UNA FACTURA
app.delete('/factura_item/:id',function(req,res){
    //console.log("Delete de articulo con id: "+req.param.id);
    factura_item.destroy({where:{id:req.params.id}})
    .then(response => res.json(response))
})