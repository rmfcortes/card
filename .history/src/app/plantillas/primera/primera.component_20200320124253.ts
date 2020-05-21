import { Component, OnInit, Input } from '@angular/core';
import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';

@Component({
  selector: 'app-primera',
  templateUrl: './primera.component.html',
  styleUrls: ['./primera.component.scss'],
})
export class PrimeraComponent implements OnInit {

  @Input() perfil: PrincipalPersona;

  constructor() { }

  ngOnInit() {
    console.log(this.perfil)
    this.setColores()
  }

  setColores(): void {
    // Color nombre
    const el = document.getElementsByClassName('nombre')[0] as HTMLElement
    el.style.setProperty('color', this.perfil.colores.nombre)

    // Color puesto
    const puesto = document.getElementsByClassName('puesto')[0] as HTMLElement
    puesto.style.setProperty('color', this.perfil.colores.puesto)

}
  

}
