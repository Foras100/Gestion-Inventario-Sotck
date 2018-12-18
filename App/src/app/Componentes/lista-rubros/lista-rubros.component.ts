import { Component, OnInit } from '@angular/core';
import { RubroServiceService } from '../../Servicios/rubro-service.service';

@Component({
  selector: 'app-lista-rubros',
  templateUrl: './lista-rubros.component.html',
  styleUrls: ['./lista-rubros.component.css']
})
export class ListaRubrosComponent implements OnInit {

  constructor(private servicioRubro:RubroServiceService) { }

  ngOnInit() {
  }

}
