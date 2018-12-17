import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rubro } from '../Clases/rubro';

@Injectable({
  providedIn: 'root'
})
export class RubroServiceService {

  rubros:Observable<Rubro[]>;
  host:string="http://localhost:3001/";
  
  constructor(private http: HttpClient) {
    this.setRubros();
  }
  setRubros(){
    this.rubros=this.http.get<Rubro[]>(this.host+"rubros");
  }
  getRubro(id:number){
    return this.http.get<Rubro>(this.host+"rubros/"+id);
  }
  guardarRubro(r:Rubro){
    return this.http.post(this.host+"rubros",r);
  }
}
