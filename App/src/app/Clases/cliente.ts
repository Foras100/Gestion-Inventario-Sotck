export class Cliente {
    id:number;
    nombre:string;
    direccion:string;
    dni:number;

    constructor(nombre:string,direccion:string,dni:number){
        this.nombre=nombre;
        this.direccion=direccion;
        this.dni=dni;
    }
}
