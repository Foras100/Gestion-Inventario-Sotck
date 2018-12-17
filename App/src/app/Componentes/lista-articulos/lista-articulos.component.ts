import { Component, OnInit } from '@angular/core';
import { ArticuloServiceService } from '../../Servicios/articulo-service.service';
import { Articulo } from '../../Clases/articulo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent implements OnInit {

  articulos:Articulo[]=[];

  constructor(private servicioArticulo:ArticuloServiceService,private router:Router) { 
    this.servicioArticulo.articulos.subscribe(data=>this.articulos=data);
  }

  mostrarInfo(id:number){
    this.router.navigate(['/infoarticulo/'+id]);
  }
  ngOnInit() {
  }

}
