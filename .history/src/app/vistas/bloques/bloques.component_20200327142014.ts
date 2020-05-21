import { Component, OnInit, Input } from '@angular/core';
import { Pasillo } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.scss'],
})
export class BloquesComponent implements OnInit {

  @Input() pasillos: Pasillo[]

  constructor() { }

  ngOnInit() {}

}
