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

  icon = '../../../assets/img/pin.jpg'

  perfil: PrincipalPersona
  error: string

  constructor(
    private commonService: CommonService,
    private perfilService: PerfilService,
  ) { }

  ngOnInit() {
    this.commonService.showLoaderMain()
    this.getPerfil()
  }

  async getPerfil() {
    this.perfil = this.perfilService.getPerfil()
    if (this.perfil) return this.commonService.hideLoader()
    try {
      this.perfil = await this.perfilService.getInfoPrincipal()
      this.commonService.hideLoader()
    } catch (error) {
      err => this.error = err
      this.commonService.hideLoader()
    }
  }

    // Color de inicio
    setBackgroundColor(color: string): void {
      const fondos: any = document.getElementsByClassName('fondo') as HTMLCollectionOf<HTMLElement>;
      for (const b of fondos) {
        b.style.setProperty('--background', color)
      }
      
      this.commonService.hideLoader()
  }

}
