import { Component, OnInit } from '@angular/core';
import { FacturaServiceService } from '../../Servicios/factura-service.service';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {

  constructor(private servicioFactura:FacturaServiceService) { }

  ngOnInit() {
  }

}
