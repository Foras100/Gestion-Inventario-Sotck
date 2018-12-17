export class Factura {
    id:number;
    fecha:Date;
    nro_sucursal:number;
    nro_correlativo:number;    
    tipo:string;
    id_proveedor:number;
    id_cliente:number;
    total:number;

    constructor(fecha:Date,nro_sucursal:number,nro_correlativo:number,tipo:string,id_proveedor:number,id_cliente:number,total:number){
        this.fecha=fecha;
        this.nro_sucursal=nro_sucursal;
        this.nro_correlativo=this.nro_correlativo;
        this.tipo=tipo;
        this.id_proveedor=id_proveedor;
        this.id_cliente=id_cliente;
        this.total=total;
    }
}
