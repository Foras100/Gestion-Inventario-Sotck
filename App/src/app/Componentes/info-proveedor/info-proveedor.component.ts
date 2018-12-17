import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../Clases/proveedor';
import { ProveedorServiceService } from '../../Servicios/proveedor-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-proveedor',
  templateUrl: './info-proveedor.component.html',
  styleUrls: ['./info-proveedor.component.css']
})
export class InfoProveedorComponent implements OnInit {

  cuitOriginal:number=0;
  proveedor:Proveedor=new Proveedor("",null,"");

  constructor(private servicioProveedor:ProveedorServiceService,private router:Router,
              private route:ActivatedRoute) {
    this.servicioProveedor.getProveedor(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe((p)=>{
      this.proveedor=p;
      this.cuitOriginal=p.cuit;
    });
  }
  guardar(){
    if(this.proveedor.nombre==""||this.proveedor.direccion==""||this.proveedor.cuit==null){
      alert("Faltan campos por completar!");
    }
    else if(this.cuitOriginal==this.proveedor.cuit){
      this.servicioProveedor.updateProveedor(this.proveedor).subscribe((p)=>{
        this.servicioProveedor.setProveedores();
        this.router.navigate(['/listaproveedores']);
      });
    }
    else if(this.servicioProveedor.checkExistsCuit(this.proveedor.cuit)){
      alert("Cuit ya registrado como proveedor!");
    }
    else{
      this.servicioProveedor.updateProveedor(this.proveedor).subscribe((p)=>{
        this.servicioProveedor.setProveedores();
        this.router.navigate(['/listaproveedores']);
      });
    }
  }
  borrar(){
    this.servicioProveedor.borrarProveedor(this.proveedor.id).subscribe((p)=>{
      this.servicioProveedor.setProveedores();
      this.router.navigate(['/listaproveedores']);
    });
  }
  ngOnInit() {
  }

}
