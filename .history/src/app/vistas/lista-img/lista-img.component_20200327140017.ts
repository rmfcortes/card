import { Component, OnInit, Input } from '@angular/core';
import { Pasillo } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-lista-img',
  templateUrl: './lista-img.component.html',
  styleUrls: ['./lista-img.component.scss'],
})
export class ListaImgComponent implements OnInit {

  @Input() pasillos: Pasillo[]

  constructor() { }

  ngOnInit() {}

}
