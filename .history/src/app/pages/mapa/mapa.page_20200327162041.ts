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
  mapReady = false;
  error: string

  perfilSub: Subscription

  constructor(
    private inAppBrowser: InAppBrowser,
    private commonService: CommonService,
  ) { }

  async ngOnInit() {
    this.getPerfil()
  }

  mapLoaded() {
    console.log('Map Ready');
    // this.mapReady = true;
  }

  getPerfil() {
    this.perfilSub = this.commonService.perfil.subscribe(perfil => this.perfil = perfil)
  }

  goMaps() {
    const dir = this.perfil.ubicacion.direccion.replace(/ /g, "+")
    const pag = `https://www.google.com/maps/?q=${dir}`
    this.inAppBrowser.create(pag, '_self');
  }

  ngOnDestroy(): void {
    if(this.perfilSub) this.perfilSub.unsubscribe()
  }

}
