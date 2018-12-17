export class Articulo {
    id:number;
    id_proveedor:number;
    codigo: number;
    nombre: string;
    descripcion:string;
    id_rubro:number;
    precio_compra:number;
    precio_venta:number;
    stock:number;
    iva:number;

    constructor(id_proveedor:number,codigo:number,nombre:string,descripcion:string,
        id_rubro:number,precio_compra:number,precio_venta:number,iva:number){
            this.id_proveedor=id_proveedor;
            this.codigo=codigo;
            this.nombre=nombre;
            this.descripcion=descripcion;
            this.id_rubro=id_rubro;
            this.precio_compra=precio_compra;
            this.precio_venta=precio_venta;
            this.stock=0;
            this.iva=iva;
        }
}
