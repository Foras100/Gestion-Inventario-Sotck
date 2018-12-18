import { Component, OnInit } from '@angular/core';
import { ProveedorServiceService } from '../../Servicios/proveedor-service.service';
import { Articulo } from '../../Clases/articulo';
import { Router } from '@angular/router';
import { ArticuloServiceService } from '../../Servicios/articulo-service.service';
import { RubroServiceService } from '../../Servicios/rubro-service.service';
import { Rubro } from '../../Clases/rubro';
import { Proveedor } from '../../Clases/proveedor';

@Component({
  selector: 'app-nuevo-articulo',
  templateUrl: './nuevo-articulo.component.html',
  styleUrls: ['./nuevo-articulo.component.css']
})
export class NuevoArticuloComponent implements OnInit {

  //id_proveedor,codigo,nombre,descripcion,id_rubro,precio_compra,precio_venta,iva
  art:Articulo=new Articulo(null,null,"","",0,0,0,21);
  proveedores:Proveedor[]=[];
  proveedor:Proveedor=null;
  rubros:Rubro[]=[];
  proveedorSeleccionado:string='';
  constructor(private servicioproveedor:ProveedorServiceService,private router:Router,
              private servicioarticulo:ArticuloServiceService,
              private serviciorubro:RubroServiceService) {
    this.serviciorubro.rubros.subscribe((r)=>this.rubros=r);
    this.servicioproveedor.proveedores.subscribe((pr)=>this.proveedores=pr);
  }
  guardar(){
    if(this.art.codigo==null || this.art.nombre==""|| 
        this.art.descripcion==""|| this.art.precio_compra==null||
        this.art.precio_venta==null){
        alert("Faltan campos por completar!");
    }
    else if(this.servicioarticulo.checkCodigo(this.art.codigo)){
      alert("El codigo pertenece a otro articulo")
    }
    else if(this.art.precio_compra>=this.art.precio_venta){
      alert("EL precio de venta debe ser mayor o igual al precio de compra")
    }
    else{
      this.art.id_proveedor=parseInt((<HTMLInputElement>document.getElementById('proveedorSeleccionado')).value);
      this.art.id_rubro=parseInt((<HTMLInputElement>document.getElementById('rubroSeleccionado')).value);
      this.art.iva=parseFloat(this.art.iva.toString())
      console.log(this.art);

      this.servicioarticulo.guardarArticulo(this.art).subscribe(()=>{
        this.servicioarticulo.setArticulos();
        this.router.navigate(['/listaarticulos']);
      });
      
    }
  }

  //guardar(){
    // if(this.art.codigo==null || this.art.nombre==""|| this.art.descripcion==""){
    //   alert("Faltan campos por completar!");
    // }
    // else if(!this.servicioarticulo.checkCodigo(this.art.codigo)){
    //   console.log(this.art);
    //   this.art.id_proveedor=this.servicioproveedor.getIdByNombre(this.prov);
    //   this.servicioarticulo.guardarArticulo(this.art);
    //   this.router.navigate(['/listaarticulos'])
    // }
    // else{
    //   alert("El codigo pertenece a otro articulo del sistema")
    // }
  //}
  ngOnInit() {
  }

}
