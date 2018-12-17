import { Component, OnInit } from '@angular/core';
import { FacturaServiceService } from '../../Servicios/factura-service.service';
import { ProveedorServiceService } from '../../Servicios/proveedor-service.service';
import { Proveedor } from '../../Clases/proveedor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {



  constructor(private servicioFactura:FacturaServiceService,private router:Router) {
  }
  mostrarInfo(id:number){
    this.router.navigate(['/infofacturacompra/'+id]);
  }
  ngOnInit() {
  }

}
