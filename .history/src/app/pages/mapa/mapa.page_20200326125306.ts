import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

    // Color de inicio
  setBackgroundColor(color: string): void {
    const fondos: any = document.getElementsByClassName('fondo') as HTMLCollectionOf<HTMLElement>;
    for (const b of fondos) {
      b.style.setProperty('--background', color)
    }

    console.log(this.perfil.colores.direccion);
    const direccion = document.querySelector('.direccion') as HTMLElement;
    console.log(direccion);
    direccion.style.setProperty('--color', this.perfil.colores.direccion)

    this.commonService.hideLoader()
  }

}
