import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../Clases/proveedor';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../Clases/articulo';

@Injectable({
  providedIn: 'root'
})
export class ProveedorServiceService {

  arrayProveedores:Proveedor[];
  proveedores:Observable<Proveedor[]>;
  host:string="http://localhost:3001/";

  constructor(private http: HttpClient) { 
    this.setProveedores();
  }

  setProveedores(){
    this.proveedores=this.http.get<Proveedor[]>(this.host+"proveedores");
    this.proveedores.subscribe(p=>this.arrayProveedores=p);
  }
  getProveedor(id:number){
    return this.http.get<Proveedor>(this.host+"proveedores/"+id);
  }
  guardarProveedor(pr:Proveedor){
    return this.http.post(this.host+"proveedor",pr);
  }
  checkExistsCuit(cuit:number){
      for(let i=0;i<this.arrayProveedores.length;i++){
        if(this.arrayProveedores[i].cuit==cuit){
          return true;
        }
      }
    return false;
  }
  updateProveedor(pr:Proveedor){
    return this.http.put(this.host+"proveedor/"+pr.id,pr);
  }
  borrarProveedor(id:number){
    return this.http.delete(this.host+"proveedor/"+id);
  }
}
