export class Proveedor {
    id:number;
    nombre:string;
    cuit:number;
    direccion:string;

    constructor(nombre:string,cuit:number,direccion:string){
        this.nombre=nombre;
        this.cuit=cuit;
        this.direccion=direccion;
    }
}
