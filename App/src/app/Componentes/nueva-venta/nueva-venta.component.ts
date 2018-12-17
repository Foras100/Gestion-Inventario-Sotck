import { Component, OnInit } from '@angular/core';
import { RubroServiceService } from '../../Servicios/rubro-service.service';
import { ClienteServiceService } from '../../Servicios/cliente-service.service';
import { ArticuloServiceService } from '../../Servicios/articulo-service.service';
import { FacturaItem } from '../../Clases/factura-item';
import { Articulo } from '../../Clases/articulo';
import { Factura } from '../../Clases/factura';
import { FacturaServiceService } from '../../Servicios/factura-service.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent implements OnInit {

  articulosSinAgregar:Articulo[]=[];
  articulosFactura:FacturaItem[]=[];
  factura:Factura=new Factura(new Date(),1,1,'A',null,0,0);
  cantidad:number=1;
  cantidades:number=1;
  acumuladorIva21:number=0;
  acumuladorIva105:number=0;
  acumuladorTotal:number=0;

  constructor(private servicioRubro:RubroServiceService,
              private servicioCliente:ClienteServiceService,
              private servicioArticulo:ArticuloServiceService,
              private servicioFactura:FacturaServiceService) {

  }
  quitarItem(item:FacturaItem){
    let arrayAuxiliar:FacturaItem[]=[];
    for(var i=0;i<this.articulosFactura.length;i++){
      if(this.articulosFactura[i].id_articulo!=item.id_articulo){
        arrayAuxiliar.push(this.articulosFactura[i]);
      }
    }

    if(item.iva==0.21){
      this.acumuladorIva21-=item.subtotal*item.iva;
    }
    else{
      this.acumuladorIva105-=item.subtotal*item.iva;
    }
    this.acumuladorTotal-=item.subtotal;
    this.articulosFactura=arrayAuxiliar;
  }
  agregar(){
    if(this.cantidad>0 && ((<HTMLInputElement>document.getElementById('select_art')).value)!= null){
      let id_articulo=parseInt((<HTMLInputElement>document.getElementById('select_art')).value);
      for(var i=0;i<this.articulosSinAgregar.length;i++){
        if(id_articulo==this.articulosSinAgregar[i].id){
          if(this.articulosSinAgregar[i].stock>=this.cantidad){
            let it = new FacturaItem(0,
                                    this.articulosSinAgregar[i].id,
                                    this.cantidad,
                                    null,
                                    parseFloat(this.articulosSinAgregar[i].precio_venta.toString()),
                                    this.articulosSinAgregar[i].codigo,
                                    this.articulosSinAgregar[i].nombre,
                                    parseFloat(this.articulosSinAgregar[i].iva.toString()),
                                    (this.articulosSinAgregar[i].precio_venta*this.cantidad));
            console.log(it);
            this.articulosFactura.push(it);
            this.acumuladorTotal+=it.subtotal;
            if(it.iva==0.21){
            this.acumuladorIva21+=it.subtotal*0.21;
            }
            else{
            this.acumuladorIva105+=it.subtotal*0.105;
            }
          }
          else{
            alert("Stock insuficiente!!!")
          }
          
        }
      }
      this.actualizarListaSinAgregar();
      
      this.cantidad=1;
    }
    else{
      alert("La cantidad debe ser mayor a 0");
    }
  }
  actualizarListaSinAgregar(){

    var id_rubro:number=parseInt((<HTMLInputElement>document.getElementById('select_filtro_rubro')).value);
    this.articulosSinAgregar=[];
    if(id_rubro==0){
      this.servicioArticulo.articulos.subscribe(ar=>{
        for(var i=0;i<ar.length;i++){
          if(!this.checkearItemFactura(ar[i])&& ar[i].stock>0)
            this.articulosSinAgregar.push(ar[i])
        }
      })
    }
    else{
      this.servicioArticulo.articulos.subscribe(ar=>{
        for(var i=0;i<ar.length;i++){
          if(ar[i].id_rubro==id_rubro && !this.checkearItemFactura(ar[i]) && ar[i].stock>0)
            this.articulosSinAgregar.push(ar[i])
        }
      })
    }
    this.actualizarCantidad();
  }
  checkearItemFactura(art:Articulo){
    if(this.articulosFactura!=[]){
      for(var i=0;i<this.articulosFactura.length;i++){
        if(this.articulosFactura[i].id_articulo==art.id)
          return true;
      }
    }
    return false;
  }
  guardar(){
    // console.log(this.factura);
    // console.log(this.articulosFactura);
    console.log(this.articulosFactura)
    if(this.factura.nro_sucursal<1||this.factura.nro_sucursal==null||
        this.factura.nro_correlativo<1||this.factura.nro_correlativo==null||
        this.factura.fecha==null||
        this.factura.tipo==null){
          alert("Faltan campos por completar o hay campos en valor negativo");
        }
        else if(this.articulosFactura.length==0){
          alert("La Factura no tiene items cargados");
        }
        else if(this.servicioFactura.checkExistsCodigoFacturaVenta(this.factura.nro_sucursal,this.factura.nro_correlativo)){
          alert("El numero de sucursal y correlativo coinciden con una factura existente! Chequee las numeros ingresados")        
        }
        else{
          //console.log("generar venta")
          this.factura.id_cliente=parseInt((<HTMLInputElement>document.getElementById('select_cliente')).value);
          let sumador:number=0;
          for(var i=0;i<this.articulosFactura.length;i++){
            sumador+=((<number>this.articulosFactura[i].iva*<number>this.articulosFactura[i].subtotal)+<number>this.articulosFactura[i].subtotal);
          }
          this.factura.total=sumador;
          //console.log(this.factura);

          this.servicioFactura.guardarFactura(this.factura).subscribe(f=>{
            this.servicioFactura.guardarItemsVenta(this.articulosFactura,(<Factura>f).id)
          })
        }
  }
  actualizarCantidad(){
    let id_articulo=parseInt((<HTMLInputElement>document.getElementById('select_art')).value);
    this.servicioArticulo.getArticulo(id_articulo).subscribe(ar=>this.cantidades=ar.stock)
  }
  ngOnInit() {
  }

}
