import { Component, OnInit } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
  navegando = false;

  constructor(
    private inAppBrowser: InAppBrowser,
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

      // Acciones
  goPage(page: string) {
    console.log(page);
    const pag = this.perfil.redes[page];
    console.log(pag);
    this.inAppBrowser.create(pag, '_self');
    this.navegando = true;
  }

  // Color de inicio
  setBackgroundColor(color: string): void {
    const fondos: any = document.getElementsByClassName('fondo') as HTMLCollectionOf<HTMLElement>;
    for (const b of fondos) {
      b.style.setProperty('--background', color)
    }
}

}
