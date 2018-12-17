import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaArticulosComponent } from './Componentes/lista-articulos/lista-articulos.component';
import { ListaClientesComponent } from './Componentes/lista-clientes/lista-clientes.component';
import { ListaProveedoresComponent } from './Componentes/lista-proveedores/lista-proveedores.component';
import { ListaVentasComponent } from './Componentes/lista-ventas/lista-ventas.component';
import { ListaComprasComponent } from './Componentes/lista-compras/lista-compras.component';
import { NuevaCompraComponent } from './Componentes/nueva-compra/nueva-compra.component';
import { NuevaVentaComponent } from './Componentes/nueva-venta/nueva-venta.component';
import { NuevoClienteComponent } from './Componentes/nuevo-cliente/nuevo-cliente.component';
import { NuevoProveedorComponent } from './Componentes/nuevo-proveedor/nuevo-proveedor.component';
import { InfoArticuloComponent } from './Componentes/info-articulo/info-articulo.component';
import { InfoClienteComponent } from './Componentes/info-cliente/info-cliente.component';
import { InfoProveedorComponent } from './Componentes/info-proveedor/info-proveedor.component';
import { InfoFacturaCompraComponent } from './Componentes/info-factura-compra/info-factura-compra.component';
import { InfoFacturaVentaComponent } from './Componentes/info-factura-venta/info-factura-venta.component';
import { NuevoArticuloComponent } from './Componentes/nuevo-articulo/nuevo-articulo.component';
import { ListaRubrosComponent } from './Componentes/lista-rubros/lista-rubros.component';
import { NuevoRubroComponent } from './Componentes/nuevo-rubro/nuevo-rubro.component';
import { InfoRubroComponent } from './Componentes/info-rubro/info-rubro.component';

const routes: Routes = [
  {path:'listaarticulos',component: ListaArticulosComponent},
  {path:'listaclientes',component: ListaClientesComponent},
  {path:'listaproveedores',component: ListaProveedoresComponent},
  {path:'listacompras',component: ListaComprasComponent},
  {path:'listaventas',component: ListaVentasComponent},
  {path:'listarubros',component: ListaRubrosComponent},
  {path:'nuevacompra',component: NuevaCompraComponent},
  {path:'nuevoarticulo',component: NuevoArticuloComponent},
  {path:'nuevaventa',component: NuevaVentaComponent},
  {path:'nuevocliente',component: NuevoClienteComponent},
  {path:'nuevoproveedor',component: NuevoProveedorComponent},
  {path:'nuevorubro',component: NuevoRubroComponent},
  {path:'infoarticulo/:id',component: InfoArticuloComponent},
  {path:'infocliente/:id',component: InfoClienteComponent},
  {path:'infoproveedor/:id',component: InfoProveedorComponent},
  {path:'infofacturacompra/:id',component: InfoFacturaCompraComponent},
  {path:'infofacturaventa/:id',component: InfoFacturaVentaComponent},
  {path:'inforubro/:id',component: InfoRubroComponent},

  {path:'', redirectTo:'listaarticulos', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
