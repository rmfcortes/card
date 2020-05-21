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
    const el = document.querySelector('.nombre') as HTMLElement;
    el.style.setProperty('color', this.perfil.colores.nombre)

    // Color puesto
    const puesto = document.querySelector('.puesto') as HTMLElement;
    puesto.style.setProperty('color', this.perfil.colores.puesto)

    // Color Fill icon
    const iconos: any = document.getElementsByClassName('iconos') as HTMLCollectionOf<HTMLElement>;
    for (const i of iconos) {
      i.style.setProperty('--color', this.perfil.colores.iconosText)
      i.style.setProperty('--background', this.perfil.colores.iconos)
      i.style.setProperty('--background-activated', this.perfil.colores.iconosText)
      i.style.setProperty('--background-activated-opacity', this.perfil.colores.iconosText)
      i.style.setProperty('--background-focused', this.perfil.colores.iconosText)
      i.style.setProperty('--background-focused-opacity', this.perfil.colores.iconosText)
      i.style.setProperty('--background-hover', `mix(#fff, #2DA830, 10%)`)
      i.style.setProperty('--background-hover-opacity', 1)
    }

    // const elu = document.querySelector('.fancy-button');
    // elu.style.setProperty('--background', '#36454f');

}
  

}
