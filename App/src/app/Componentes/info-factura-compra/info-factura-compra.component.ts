import { Component, OnInit } from '@angular/core';
import { FacturaServiceService } from '../../Servicios/factura-service.service';
import { ArticuloServiceService } from '../../Servicios/articulo-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Factura } from '../../Clases/factura';
import { ProveedorServiceService } from '../../Servicios/proveedor-service.service';
import { Proveedor } from '../../Clases/proveedor';
import { FacturaItem } from '../../Clases/factura-item';

@Component({
  selector: 'app-info-factura-compra',
  templateUrl: './info-factura-compra.component.html',
  styleUrls: ['./info-factura-compra.component.css']
})
export class InfoFacturaCompraComponent implements OnInit {

  proveedor:Proveedor=new Proveedor("",0,"");
  factura:Factura= new Factura(null,0,0,null,0,null,0);
  articulosFactura:FacturaItem[]=[];
  acumuladorIva21=0;
  acumuladorIva105=0;
  acumuladorTotal=0;

  constructor(private servicioFactura:FacturaServiceService,
              private servicioArticulo:ArticuloServiceService,
              private servicioProveedor:ProveedorServiceService,
              private router:Router,
              private route:ActivatedRoute) {
    this.servicioFactura.getFactura(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(f=>{
        this.factura=f;
        this.servicioProveedor.getProveedor(parseInt(f.id_proveedor.toString())).subscribe(pr=>this.proveedor=pr);
        this.servicioFactura.getItems(f.id).subscribe(it=>{
          console.log(it)
          this.articulosFactura=it;
          this.actualizarAcumuladores();
        });
      })
  }
  borrar(){
    this.servicioFactura.borrarFactura(this.factura.id).subscribe(()=>{
      this.servicioFactura.setFacturas();
      this.router.navigate(["/listacompras"]);
    });
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
