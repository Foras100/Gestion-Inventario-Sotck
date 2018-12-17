import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../Clases/cliente';
import { ClienteServiceService } from '../../Servicios/cliente-service.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.component.html',
  styleUrls: ['./info-cliente.component.css']
})
export class InfoClienteComponent implements OnInit {

  cliente:Cliente=new Cliente("","",null);
  dniOrginial:number=0;

  constructor(private serviceCliente:ClienteServiceService,private router:Router,
              private route:ActivatedRoute) {
    this.serviceCliente.getCliente(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(cl=>{
      this.cliente=cl;
      this.dniOrginial=cl.dni;
    });
   }

  guardar(){
    if(this.cliente.nombre==""||this.cliente.direccion==""||this.cliente.dni==null){
      alert("Faltan campos por completar!");
    }
    else if(this.dniOrginial==this.cliente.dni){
      this.serviceCliente.updateCliente(this.cliente).subscribe((d)=>{
        this.serviceCliente.setClientes();
        this.router.navigate(['/listaclientes']);
      });
    }
    else if(this.serviceCliente.checkExistsDni(this.cliente.dni)){
      alert("DNI ya registrado como cliente!");
    }
    else{
      this.serviceCliente.updateCliente(this.cliente).subscribe((d)=>{
        this.serviceCliente.setClientes();
        this.router.navigate(['/listaclientes']);
      });
    }
  }

  borrar(){
    this.serviceCliente.borrarCliente(this.cliente.id).subscribe((d)=>{
      this.serviceCliente.setClientes();
      this.router.navigate(['/listaclientes']);
    })
  }
  ngOnInit() {
  }

}
