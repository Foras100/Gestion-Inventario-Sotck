import { Component, OnInit } from '@angular/core';
import { FacturaItem } from '../../Clases/factura-item';
import { Factura } from '../../Clases/factura';
import { ProveedorServiceService } from '../../Servicios/proveedor-service.service';
import { ArticuloServiceService } from '../../Servicios/articulo-service.service';
import { Articulo } from '../../Clases/articulo';
import { Observable } from 'rxjs';
import { FacturaServiceService } from '../../Servicios/factura-service.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.component.html',
  styleUrls: ['./nueva-compra.component.css']
})
export class NuevaCompraComponent implements OnInit {

  //(id_factura: number, id_articulo: number, cantidad: number, precio_compra: number, precio_venta: number)
  articulosFactura:FacturaItem[]=[];
  articulosSinAgregar:Articulo[]=[];
  factura:Factura= new Factura(new Date(),1,1,'A',0,0,0);
  cantidad:number=1;
  acumuladorIva21:number=0;
  acumuladorIva105:number=0;
  acumuladorTotal:number=0;

  constructor(private servicioProveedor:ProveedorServiceService, private servicioArticulo:ArticuloServiceService,
              private servicioFactura:FacturaServiceService,private router:Router) { 
  }
  agregar(){
    if(this.cantidad>0){
      //let articulo:Articulo=null;
      let id_articulo=parseInt((<HTMLInputElement>document.getElementById('select_art')).value);
      for(var i=0;i<this.articulosSinAgregar.length;i++){
        if(id_articulo==this.articulosSinAgregar[i].id){
          let it = new FacturaItem(0,
                                  this.articulosSinAgregar[i].id,
                                  this.cantidad,
                                  parseFloat(this.articulosSinAgregar[i].precio_compra.toString()),
                                  null,
                                  this.articulosSinAgregar[i].codigo,
                                  this.articulosSinAgregar[i].nombre,
                                  //this.articulosSinAgregar[i].iva,
                                  parseFloat(this.articulosSinAgregar[i].iva.toString()),
                                  (this.articulosSinAgregar[i].precio_compra*this.cantidad));//Subtotal
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
        
      }
      this.actualizarListaSinAgregar();
      this.cantidad=1;
    }
    else{
      alert("La cantidad debe ser mayor a 0");
    }
    // this.servicioArticulo.getArticulo(parseInt((<HTMLInputElement>document.getElementById('select_art')).value)).subscribe(a=>{
    //   articulo=a;
    //   console.log(articulo);
    // });
  }
  actualizarListaSinAgregar(){
    var id_proveedor:number=parseInt((<HTMLInputElement>document.getElementById('select_proveedor')).value);
    this.articulosSinAgregar=[];
    this.servicioArticulo.articulos.subscribe(ar=>{
      for(var i=0;i<ar.length;i++){
        if(ar[i].id_proveedor==id_proveedor && !this.checkearItemFactura(ar[i])){
          this.articulosSinAgregar.push(ar[i])
        }
      }
    })
  }
  cargarArticulos(){
    //console.log("carga de productos de ese proveedor");
    this.acumuladorIva21=0;
    this.acumuladorIva105=0;
    this.acumuladorTotal=0;
    this.articulosFactura=[]
    this.articulosSinAgregar=[];
    var id_proveedor:number=parseInt((<HTMLInputElement>document.getElementById('select_proveedor')).value);

    this.servicioArticulo.articulos.subscribe(ar=>{
      for(var i=0;i<ar.length;i++){
        if(ar[i].id_proveedor==id_proveedor && !this.checkearItemFactura(ar[i])){
          this.articulosSinAgregar.push(ar[i])
        }
      }
    })
    
  }

  //Chequeo que el articulo que voy a agregar a la lista de articulos para agregar a la factura no este ya en la misma
  checkearItemFactura(ar:Articulo){
    if(this.articulosFactura!=[]){
      for(var i=0;i<this.articulosFactura.length;i++){
        if(this.articulosFactura[i].id_articulo==ar.id)
          return true
      }
    }
    return false
  }

  guardar(){
    // this.factura.id_proveedor=parseInt((<HTMLInputElement>document.getElementById('select_proveedor')).value);
    // console.log(this.factura);
    // console.log(this.articulosFactura);

    if(this.factura.nro_sucursal<1||this.factura.nro_sucursal==null||
      this.factura.nro_correlativo<1|| this.factura.nro_correlativo==null||
      this.factura.fecha==null||
      this.factura.tipo==null){
        alert("Faltan campos por completar o hay campos en valor negativo");
      }
      else if(this.articulosFactura.length==0){
        alert("La Factura no tiene items cargados");
      }
      else if(this.servicioFactura.checkExistsCodigoFacturaCompra(this.factura.nro_sucursal,this.factura.nro_correlativo)){
        alert("El numero de sucursal y correlativo coinciden con una factura existente! Chequee las numeros ingresados")        
      }
      else{
        this.factura.id_proveedor=parseInt((<HTMLInputElement>document.getElementById('select_proveedor')).value);
        let sumador:number=0;
        for(var i=0;i<this.articulosFactura.length;i++){
          sumador+=((<number>this.articulosFactura[i].iva*<number>this.articulosFactura[i].subtotal)+<number>this.articulosFactura[i].subtotal);
        }
        this.factura.total=sumador;
        
        this.servicioFactura.guardarFactura(this.factura).subscribe(f=>{
          this.servicioFactura.guardarItemsCompra(this.articulosFactura,(<Factura>f).id);
          this.router.navigate(['/listacompras'])
        })
      }
  }
  ngOnInit() {
  }

}
