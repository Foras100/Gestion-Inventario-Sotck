import { Component, OnInit } from '@angular/core';
import { ClienteServiceService } from '../../Servicios/cliente-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  constructor(private servicioCliente:ClienteServiceService,private Router:Router) {

   }

   mostrarInfo(id:number){
    this.Router.navigate(['/infocliente/'+id])
   }

  ngOnInit() {
  }

}
