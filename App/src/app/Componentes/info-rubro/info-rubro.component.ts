import { Component, OnInit } from '@angular/core';
import { RubroServiceService } from '../../Servicios/rubro-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rubro } from '../../Clases/rubro';

@Component({
  selector: 'app-info-rubro',
  templateUrl: './info-rubro.component.html',
  styleUrls: ['./info-rubro.component.css']
})
export class InfoRubroComponent implements OnInit {

  rubro:Rubro=new Rubro("","","");

  constructor(private servicioRubro:RubroServiceService,
              private route:ActivatedRoute,
              private router:Router) {
    this.servicioRubro.getRubro(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(r=>{
      this.rubro=r;
    })
  }
  borrar(){
    this.servicioRubro.borrarRubro(this.rubro.id).subscribe(()=>this.router.navigate(["/listarubros"]))
  }
  guardar(){
    let coincide:boolean = false;
    this.servicioRubro.rubros.subscribe(r=>{
      for(var i=0;i<r.length;i++){
        if(r[i].nombre==this.rubro.nombre && r[i].id!=this.rubro.id){
          coincide=true;
        }
      }
      if(coincide){
        alert("Ya existe el rubro '"+this.rubro.nombre+"'");
        coincide=false;
      }
      else{
        this.servicioRubro.updateRubro(this.rubro).subscribe(()=>{
          this.servicioRubro.setRubros();
          this.router.navigate(["/listarubros"]);
        });
      }
    })
  }
  ngOnInit() {
  }

}
