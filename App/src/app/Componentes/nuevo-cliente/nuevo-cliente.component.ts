import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../Clases/cliente';
import { ClienteServiceService } from '../../Servicios/cliente-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  cliente: Cliente= new Cliente("","",null);

  constructor(private servicioCliente:ClienteServiceService,private router:Router) {

  }

  guardar(){
    if(this.cliente.nombre=="" || this.cliente.direccion=="" || this.cliente.dni==0){
      alert("Faltan campos por completar");
    }
    else if(this.servicioCliente.checkExistsDni(this.cliente.dni)){
      alert("Cliente ya registrado");
    }
    else{
      this.servicioCliente.guardarCliente(this.cliente).subscribe(()=>{
        this.servicioCliente.setClientes();
        this.router.navigate(['/listaclientes']);
      });
    }
  }
  ngOnInit() {
  }

}
