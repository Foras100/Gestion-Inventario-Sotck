import { Component, OnInit } from '@angular/core';
import { ArticuloServiceService } from '../../Servicios/articulo-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from '../../Clases/articulo';
import { ProveedorServiceService } from '../../Servicios/proveedor-service.service';
import { RubroServiceService } from '../../Servicios/rubro-service.service';
import { Proveedor } from '../../Clases/proveedor';
import { Rubro } from '../../Clases/rubro';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-info-articulo',
  templateUrl: './info-articulo.component.html',
  styleUrls: ['./info-articulo.component.css']
})
export class InfoArticuloComponent implements OnInit {

  articulo:Articulo=new Articulo(0,0,"Nombre","Descripcion",null,0,0,21);
  proveedor:Proveedor=null;
  rubro:Rubro=null;
  articuloForm = new FormGroup({ rubroControl: new FormControl() });
  
  constructor(private servicioArticulo:ArticuloServiceService,private route:ActivatedRoute,
              private servicioProveedor:ProveedorServiceService,private servicioRubro:RubroServiceService,
              private router:Router) {
    this.servicioArticulo.getArticulo(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe((a)=>{
      this.articulo=a;
      this.actualizarItems();
    });
  }
  
  actualizarItems(){
    this.servicioProveedor.getProveedor(this.articulo.id_proveedor).subscribe(p=>{
      this.proveedor=p;
      (<HTMLInputElement>document.getElementById('select_proveedor')).value = p.id.toString();
    });
    this.servicioRubro.getRubro(this.articulo.id_rubro).subscribe(r=>{
      this.rubro=r;
      (<HTMLInputElement>document.getElementById('select_rubro')).value = r.id.toString();
    });
    
  }
  guardar(){
    if(this.articulo.codigo==null || this.articulo.nombre==""|| this.articulo.descripcion==""){
      alert("Faltan campos por completar!");
    }
    else {
      this.articulo.id_proveedor=parseInt((<HTMLInputElement>document.getElementById('select_proveedor')).value);
      this.articulo.id_rubro=parseInt((<HTMLInputElement>document.getElementById('select_rubro')).value);
      
      this.servicioArticulo.updateArticulo(this.articulo).subscribe(p=>this.router.navigate(['/listaarticulos']));

    }
  }
  borrar(){
    this.servicioArticulo.borrarArticulo(this.articulo.id).subscribe(p=>this.router.navigate(['/listaarticulos']));
  }
  ngOnInit() {
  }
}