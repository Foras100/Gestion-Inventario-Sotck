export class FacturaItem {
    id:number;
    id_factura:number;
    id_articulo:number;
    cantidad:number;
    precio_compra:number;
    precio_venta:number;
    
    codigo_articulo:number;
    nombre_articulo:string;
    iva:number;
    subtotal:number;

    constructor(id_factura:number,id_articulo:number,cantidad:number,precio_compra:number,precio_venta:number,
        codigo_articulo:number,nombre_articulo:string,iva:number,subtotal:number){
        this.id_factura=id_factura;
        this.id_articulo=id_articulo;
        this.cantidad=cantidad;
        this.precio_compra=precio_compra;
        this.precio_venta=precio_venta;
        this.codigo_articulo=codigo_articulo;
        this.nombre_articulo=nombre_articulo;
        this.iva=iva;
        this.subtotal=subtotal;
    }
}
