# Gestion-Inventario-Stock
Applicacion creada con angular 6 contra servidor REST express y Postgresql para la asignatura Laboratorio 4 de la Tecnicatura Superior en Programacion de la UTN-FRP.


## A tener en cuenta...

La base de datos en postgres se debe llamar Laboratorio2018 o cambiar el nombre de la BD en Server/index.js.

Para generar una factura de compra primero se deben tener cargados al menos un rubro, un articulo y un proveedor.

Para generar una de venta se necesitan precargados un cliente y que algun articulo tenga stock myor a 0.

Tanto las carpetas Server como App solo tienen los archivos propios del sistema, se deben genrar los respectivos archivos de soporte para ambos.

Para el servidor las dependencias necesarias son => "npm install -s express sequelize nodemon pg pg-hstore multer body-parser".
Para la app agregamos bootstrap jquery y popper => "npm install -s bootstrap jquery popper.js --save-prod".
