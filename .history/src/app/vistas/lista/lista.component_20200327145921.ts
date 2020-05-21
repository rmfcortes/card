import { Component, OnInit, Input } from '@angular/core';
import { Pasillo } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input() pasillos: Pasillo[]

  constructor() { }

  ngOnInit() {}

}
