import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../Clases/factura';
import { FacturaItem } from '../Clases/factura-item';

@Injectable({
  providedIn: 'root'
})
export class FacturaServiceService {

  arrayFacturasCompras:Factura[]=[];
  arrayFacturasVentas:Factura[]=[];
  facturasVenta:Observable<Factura[]>
  facturasCompra:Observable<Factura[]>
  host:string="http://localhost:3001/";

  constructor(private http: HttpClient) { 
    this.setFacturas();
  }
  setFacturas(){
    this.setFacturasCompra();
    this.setFacturasVenta();
  }
  setFacturasCompra(){
    this.facturasCompra=this.http.get<Factura[]>(this.host+"facturas_compra");
    this.facturasCompra.subscribe(f=>this.arrayFacturasCompras=f);
  }
  setFacturasVenta(){
    this.facturasVenta=this.http.get<Factura[]>(this.host+"facturas_venta");
    this.facturasVenta.subscribe(f=>this.arrayFacturasVentas=f);
  }
  getItems(id_factura:number){
    return this.http.get<FacturaItem[]>(this.host+"facturas_item/"+id_factura);
  }
  getFactura(id:number){
    return this.http.get<Factura>(this.host+"facturas/"+id);
  }
  guardarFactura(factura:Factura){
    return this.http.post(this.host+"factura",factura);
  }
  checkExistsCodigoFacturaCompra(nro_sucursal:number,nro_correlativo:number){
    // console.log("ingreso chequeo factura");
    // console.log("sucursal"+nro_sucursal);
    // console.log("correlativo"+nro_correlativo);
    for(var i=0;i<this.arrayFacturasCompras.length;i++){
      if(this.arrayFacturasCompras[i].nro_sucursal==nro_sucursal && this.arrayFacturasCompras[i].nro_correlativo==nro_correlativo){
        return true;
      }
    }
    return false;
  }
  checkExistsCodigoFacturaVenta(nro_sucursal:number,nro_correlativo:number){
    for(var i=0;i<this.arrayFacturasVentas.length;i++){
      if(this.arrayFacturasVentas[i].nro_sucursal==nro_sucursal && this.arrayFacturasVentas[i].nro_correlativo==nro_correlativo){
        return true;
      }
    }
    return false;
  }
  guardarItemsCompra(items:FacturaItem[],id_factura:number){
    for(var i=0;i<items.length;i++){
      items[i].id_factura=id_factura;
      this.http.post(this.host+"factura_item_compra",items[i]).subscribe();
    }
  }
  guardarItemsVenta(items:FacturaItem[],id_factura:number){
    for(var i=0;i<items.length;i++){
      items[i].id_factura=id_factura;
      this.http.post(this.host+"factura_item_venta",items[i]).subscribe();
    }
  }
  borrarFactura(id:number){
    return this.http.delete(this.host+"factura/"+id);
  }
}
