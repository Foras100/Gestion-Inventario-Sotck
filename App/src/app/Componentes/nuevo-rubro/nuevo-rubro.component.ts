import { Component, OnInit } from '@angular/core';
import { Rubro } from '../../Clases/rubro';
import { RubroServiceService } from '../../Servicios/rubro-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-rubro',
  templateUrl: './nuevo-rubro.component.html',
  styleUrls: ['./nuevo-rubro.component.css']
})
export class NuevoRubroComponent implements OnInit {

  rubro:Rubro= new Rubro("","","");

  constructor(private servicioRubro:RubroServiceService,
              private router:Router) {
  }
  guardar(){
    let coincide:boolean = false;
    this.servicioRubro.rubros.subscribe(r=>{
      for(var i=0;i<r.length;i++){
        if(r[i].nombre==this.rubro.nombre){
          coincide=true;
        }
      }
      if(coincide){
        alert("Ya existe el rubro '"+this.rubro.nombre+"'");
        coincide=false;
      }
      else{
        this.servicioRubro.guardarRubro(this.rubro).subscribe(()=>this.router.navigate(["/listarubros"]));
      }
    })
  }
    
  ngOnInit() {
  }

}
