import { Component, OnInit } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { PerfilService } from 'src/app/services/perfil.service';

import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  icon = '../../../assets/img/pin.png'

  perfil: PrincipalPersona
  error: string

  constructor(
    private inAppBrowser: InAppBrowser,
    private commonService: CommonService,
    private perfilService: PerfilService,
  ) { }

  async ngOnInit() {
    await this.commonService.showLoaderMain()
    this.getPerfil()
  }

  async getPerfil() {
    this.perfil = this.perfilService.getPerfil()
    if (this.perfil) {
      this.setBackgroundColor(this.perfil.colores.background || null)
      return 
    }
    this.getPerfilDB()
  }

  getPerfilDB() {
    const parsedURL = new URL (window.location.href)
    const host = parsedURL.origin
    if (host) {
      this.perfilService.getId(host)
      .then(perfil => {
        this.perfil = perfil
        this.commonService.setInfo(this.perfil)
        this.setBackgroundColor(perfil.colores.background || null)
      })
      .catch(err => this.error = err)
    }
  }

  goMaps() {
    const pag = `https://www.google.com/maps/?g=${this.perfil.ubicacion.lat},${this.perfil.ubicacion.lng}=${this.perfil.ubicacion.lat},${this.perfil.ubicacion.lng}&z=16`
    console.log(pag);
    this.inAppBrowser.create(pag, 'blank');
  }

    // Color de inicio
  setBackgroundColor(color: string): void {
    const fondos: any = document.getElementsByClassName('fondo') as HTMLCollectionOf<HTMLElement>;
    for (const b of fondos) {
      b.style.setProperty('--background', color)
    }

    const colorContacto: any = document.getElementsByClassName('colorContacto') as HTMLCollectionOf<HTMLElement>;
    for (const b of colorContacto) {
      b.style.setProperty('color', `${this.perfil.colores.contactoTitulo}`)
    }
    const bordes: any = document.getElementsByClassName('border-contacto') as HTMLCollectionOf<HTMLElement>;
    for (const b of bordes) {
      b.style.setProperty('border-bottom', `${this.perfil.colores.contactoTitulo} 1px solid`)
    }

    const direccion = document.querySelector('.direccion') as HTMLElement;
    direccion.style.setProperty('--color', this.perfil.colores.direccion)

    this.commonService.hideLoader()
  }

}
