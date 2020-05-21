import { Component, OnInit } from '@angular/core';

import { PerfilService } from '../services/perfil.service';

import { PrincipalPersona } from '../interfaces/perfil.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  error: string
  perfil: PrincipalPersona

  constructor(
    private perfilService: PerfilService,
  ) {}

  ngOnInit(): void {
    const parsedURL = new URL (window.location.href)
    const host = parsedURL.origin
    console.log(host);
    if (host) {
      this.perfilService.getId(host)
      .then(perfil => {
        this.perfil = perfil
        this.setBackgroundColor(perfil.colores.background || null)
      })
      .catch(err => this.error = err)
    } else {
      // Planilla para pantalla principal
    }
  }

  setBackgroundColor(color: string): void {
    const fondos: any = document.getElementsByClassName('fondo') as HTMLCollectionOf<HTMLElement>;
    for (const b of fondos) {
      b.style.setProperty('--background', color)
    }

    // const el = document.querySelector('.fondo') as HTMLElement;
    // el.style.setProperty('--background', color)
    // puesto.style.setProperty('color', this.perfil.colores.puesto)
    // const el = document.getElementsByClassName('fondo')[0] as HTMLElement
}

}
