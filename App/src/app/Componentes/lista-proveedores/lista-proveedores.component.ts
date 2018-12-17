import { Component, OnInit } from '@angular/core';
import { ProveedorServiceService } from 'src/app/Servicios/proveedor-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {

  constructor(private servicioProveedor:ProveedorServiceService,private Router:Router) { }

  mostrarInfo(id:number){
    this.Router.navigate(['/infoproveedor/'+id]);
   }
  ngOnInit() {
  }

}
