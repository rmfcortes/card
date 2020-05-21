import { Component, OnInit, Input } from '@angular/core';
import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';

@Component({
  selector: 'app-separador-estrella',
  templateUrl: './separador-estrella.component.html',
  styleUrls: ['./separador-estrella.component.scss'],
})
export class SeparadorEstrellaComponent implements OnInit {

  @Input() perfil: PrincipalPersona

  constructor() { }

  ngOnInit() {}

  setColores(): void {

    // Color Titulo contacto
    const bordes: any = document.getElementsByClassName('border-contacto') as HTMLCollectionOf<HTMLElement>;
    for (const b of bordes) {
      b.style.setProperty('border-bottom', `${this.perfil.colores.contactoTitulo} 1px solid`)
    }

  }

}
