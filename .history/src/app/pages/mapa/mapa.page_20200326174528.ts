import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { CommonService } from 'src/app/services/common.service';

import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, OnDestroy {

  icon = '../../../assets/img/pin.png'

  perfil: PrincipalPersona
  error: string

  perfilSub: Subscription

  constructor(
    private inAppBrowser: InAppBrowser,
    private commonService: CommonService,
  ) { }

  async ngOnInit() {
    this.getPerfil()
  }

  getPerfil() {
    this.perfilSub = this.commonService.perfil.subscribe(perfil => this.perfil = perfil)
  }

  goMaps() {
    const dir = this.perfil.ubicacion.direccion.replace(/ /g, "+")
    const pag = `https://www.google.com/maps/?q=${dir}`
    this.inAppBrowser.create(pag, '_self');
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

    const botones = document.querySelector('.boton-navigate') as HTMLElement;
    botones.style.setProperty('color', this.perfil.colores.botonesFill)

    this.commonService.hideLoader()
  }

  ngOnDestroy(): void {
    if(this.perfilSub) this.perfilSub.unsubscribe()
  }

}
