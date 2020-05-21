import { Component, OnInit, Input } from '@angular/core';
import { Pasillo } from 'src/app/interfaces/productos.interface';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit {

  @Input() pasillos: Pasillo[]

  constructor() { }

  ngOnInit() {}

}
