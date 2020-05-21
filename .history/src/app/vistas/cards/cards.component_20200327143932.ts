import { Component, OnInit, Input } from '@angular/core';
import { Pasillo } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  @Input() pasillos: Pasillo[]

  constructor() { }

  ngOnInit() {}

}
