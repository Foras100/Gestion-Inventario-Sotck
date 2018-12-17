import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaClientesComponent } from './Componentes/lista-clientes/lista-clientes.component';
import { ListaProveedoresComponent } from './Componentes/lista-proveedores/lista-proveedores.component';
import { NuevoClienteComponent } from './Componentes/nuevo-cliente/nuevo-cliente.component';
import { NuevoProveedorComponent } from './Componentes/nuevo-proveedor/nuevo-proveedor.component';
import { InfoClienteComponent } from './Componentes/info-cliente/info-cliente.component';
import { InfoProveedorComponent } from './Componentes/info-proveedor/info-proveedor.component';
import { ListaComprasComponent } from './Componentes/lista-compras/lista-compras.component';
import { ListaVentasComponent } from './Componentes/lista-ventas/lista-ventas.component';
import { InfoFacturaCompraComponent } from './Componentes/info-factura-compra/info-factura-compra.component';
import { InfoFacturaVentaComponent } from './Componentes/info-factura-venta/info-factura-venta.component';
import { InfoArticuloComponent } from './Componentes/info-articulo/info-articulo.component';
import { ListaArticulosComponent } from './Componentes/lista-articulos/lista-articulos.component';
import { NuevaCompraComponent } from './Componentes/nueva-compra/nueva-compra.component';
import { NuevaVentaComponent } from './Componentes/nueva-venta/nueva-venta.component';
import { NuevoArticuloComponent } from './Componentes/nuevo-articulo/nuevo-articulo.component';
import {HttpClientModule} from '@angular/common/http';
import { NuevoRubroComponent } from './Componentes/nuevo-rubro/nuevo-rubro.component';
import { InfoRubroComponent } from './Componentes/info-rubro/info-rubro.component';
import { ListaRubrosComponent } from './Componentes/lista-rubros/lista-rubros.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaClientesComponent,
    ListaProveedoresComponent,
    NuevoClienteComponent,
    NuevoProveedorComponent,
    InfoClienteComponent,
    InfoProveedorComponent,
    ListaComprasComponent,
    ListaVentasComponent,
    InfoFacturaCompraComponent,
    InfoFacturaVentaComponent,
    InfoArticuloComponent,
    ListaArticulosComponent,
    NuevaCompraComponent,
    NuevaVentaComponent,
    NuevoArticuloComponent,
    NuevoRubroComponent,
    InfoRubroComponent,
    ListaRubrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
