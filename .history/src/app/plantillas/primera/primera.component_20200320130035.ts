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
    const el = document.querySelector('nombre') as HTMLElement;
    el.style.setProperty('color', this.perfil.colores.nombre)

    // Color puesto
    const puesto = document.getElementsByClassName('puesto')[0] as HTMLElement
    puesto.style.setProperty('color', this.perfil.colores.puesto)

    // Color Fill icon
    const iconos = document.getElementsByClassName('iconos') as HTMLCollectionOf<HTMLElement>;
    iconos.style.setProperty('--background', this.perfil.colores.iconos)

    // Color Texto icon
    const iconosText = document.getElementsByClassName('text-icon')[0] as HTMLElement
    iconosText.style.setProperty('--color', this.perfil.colores.iconosTexto)

    const elu = document.querySelector('.fancy-button');
    elu.style.setProperty('--background', '#36454f');

}
  

}
