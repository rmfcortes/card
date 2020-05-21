import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CommonService } from '../services/common.service';

import { PrincipalPersona } from '../interfaces/perfil.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  titleMode = 'hide';
  position = 'center';
  perfil: PrincipalPersona;

  infoSub: Subscription;

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.infoSub = this.commonService.infoReady.subscribe(resp => {
      if (resp) {
        this.perfil = resp
        this.setColores()
      }
    })
  }

  setColores(): void {
    // Color nombre
    const el = document.querySelector('.boton-home') as HTMLElement;
    el.style.setProperty('--color', this.perfil.colores.iconHomeTab)
    el.style.setProperty('--background', this.perfil.colores.iconosTabs)
    
    const iconos: any = document.getElementsByClassName('icono-tab') as HTMLCollectionOf<HTMLElement>;
    for (const i of iconos) {
      i.style.setProperty('--color', this.perfil.colores.iconosText)
    }
  }

}
