import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../Clases/articulo';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticuloServiceService {

  arrayArticulos:Articulo[];
  articulos: Observable<Articulo[]>;
  host:string="http://localhost:3001/";

  constructor(private http: HttpClient) { 
    this.setArticulos();
  }

  setArticulos(){
    this.articulos=this.http.get<Articulo[]>(this.host+"articulos");
    this.articulos.subscribe(a=>this.arrayArticulos=a);
  }

  guardarArticulo(art:Articulo){
    this.http.post(this.host+"articulo",art).subscribe(()=>this.setArticulos());
  }
  borrarArticulo(id:number){
    return this.http.delete(this.host+"articulo/"+id);
  }
  updateArticulo(art:Articulo){
    return this.http.put(this.host+"articulo/"+art.id,art);
  }
  getArticulo(id:number){
    return this.http.get<Articulo>(this.host+"articulos/"+id);
  }
  checkCodigo(cod:number){
    for(let i=0;i<this.arrayArticulos.length;i++){
      if(this.arrayArticulos[i].codigo==cod){
        return true;
      }
    }
    return false;
  }
  //getArticulosDeProveedor(id_proveedor:number){
    
}
