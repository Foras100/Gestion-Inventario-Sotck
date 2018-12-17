import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Cliente } from '../Clases/cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  arrayClientes:Cliente[];
  clientes:Observable<Cliente[]>
  host:string="http://localhost:3001/";

  constructor(private http: HttpClient) { 
    this.setClientes();
  }
  setClientes(){
    this.clientes=this.http.get<Cliente[]>(this.host+"clientes");
    this.clientes.subscribe(d=>this.arrayClientes=d);
  }
  getCliente(id:number){
    return this.http.get<Cliente>(this.host+"clientes/"+id);
  }
  guardarCliente(cl:Cliente){
    return this.http.post(this.host+"cliente",cl);
  }
  updateCliente(cl:Cliente){
    return this.http.put(this.host+"cliente",cl);
  }
  borrarCliente(id:number){
    return this.http.delete(this.host+"cliente/"+id);
  }
  checkExistsDni(dni:number){
    for(let i=0;i<this.arrayClientes.length;i++){
      if(this.arrayClientes[i].dni==dni){
        return true;
      }
    }
    return false;
  }
}
