import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../Clases/cliente';
import { Factura } from '../../Clases/factura';
import { FacturaItem } from '../../Clases/factura-item';
import { FacturaServiceService } from '../../Servicios/factura-service.service';
import { ArticuloServiceService } from '../../Servicios/articulo-service.service';
import { ProveedorServiceService } from '../../Servicios/proveedor-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteServiceService } from '../../Servicios/cliente-service.service';

@Component({
  selector: 'app-info-factura-venta',
  templateUrl: './info-factura-venta.component.html',
  styleUrls: ['./info-factura-venta.component.css']
})
export class InfoFacturaVentaComponent implements OnInit {
  
  cliente:Cliente = new Cliente("","",0)
  factura:Factura= new Factura(null,0,0,null,0,null,0);
  articulosFactura:FacturaItem[]=[];
  acumuladorIva21=0;
  acumuladorIva105=0;
  acumuladorTotal=0;

  constructor(private servicioFactura:FacturaServiceService,
              private servicioArticulo:ArticuloServiceService,
              private servicioCliente:ClienteServiceService,
              private router:Router,
              private route:ActivatedRoute) {

    this.servicioFactura.getFactura(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(f=>{
        this.factura=f;
        this.servicioCliente.getCliente(parseInt(f.id_cliente.toString())).subscribe(cl=>this.cliente=cl);
        this.servicioFactura.getItems(f.id).subscribe(it=>{
          this.articulosFactura=it;
          this.actualizarAcumuladores();
        });
      })
  }
  
  actualizarAcumuladores(){
    for(var i=0;i<this.articulosFactura.length;i++){
      if(this.articulosFactura[i].iva==0.21){
        this.acumuladorIva21+=this.articulosFactura[i].subtotal*0.21;
      }
      else{
        this.acumuladorIva105+=this.articulosFactura[i].subtotal*0.105;
      }
      this.acumuladorTotal+=this.articulosFactura[i].subtotal
    }
  }
  ngOnInit() {
  }

}
