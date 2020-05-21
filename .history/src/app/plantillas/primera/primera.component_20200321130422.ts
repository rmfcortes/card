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

    // Color Titulo contacto
    const bordes: any = document.getElementsByClassName('border-contacto') as HTMLCollectionOf<HTMLElement>;
    for (const b of bordes) {
      b.style.setProperty('border-bottom', `${this.perfil.colores.contactoTitulo} 1px solid`)
    }
    const iconoEstrella = document.querySelector('.estrella') as HTMLElement;
    iconoEstrella.style.setProperty('color', this.perfil.colores.contactoTitulo)

    // Color Fill icon
    const botones: any = document.getElementsByClassName('botones') as HTMLCollectionOf<HTMLElement>;
    for (const b of botones) {
      b.style.setProperty('color', this.perfil.colores.botonesFill)
      b.style.setProperty('--color', this.perfil.colores.botonesText)
      b.style.setProperty('--background', this.perfil.colores.botonesFill)
    }
    
    const iconos: any = document.getElementsByClassName('iconos') as HTMLCollectionOf<HTMLElement>;
    for (const i of iconos) {
      i.style.setProperty('--color', this.perfil.colores.iconosText)
    }

  }
  

}
