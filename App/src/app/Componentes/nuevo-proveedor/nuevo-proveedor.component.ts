import { Component, OnInit } from '@angular/core';
import { ProveedorServiceService } from '../../Servicios/proveedor-service.service';
import { Router } from '@angular/router';
import { Proveedor } from '../../Clases/proveedor';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css']
})
export class NuevoProveedorComponent implements OnInit {

  proveedor:Proveedor=new Proveedor("",null,"");
  constructor(private servicioProveedor:ProveedorServiceService,private router:Router) { 
    
  }
  guardar(){
    if(this.proveedor.nombre==""||this.proveedor.direccion==""||this.proveedor.cuit==null){
      alert("Faltan campos por completar!");
    }
    else if(this.servicioProveedor.checkExistsCuit(this.proveedor.cuit)){
      alert("Cuit ya registrado como proveedor!");
    }
    else{
       this.servicioProveedor.guardarProveedor(this.proveedor).subscribe((p)=>{
         this.servicioProveedor.setProveedores();
         this.router.navigate(['/listaproveedores']);
       });
    }
  }
  ngOnInit() {
  }

}
