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
      this.perfil = resp
      this.setColores()
    })
  }

  setColores(): void {
    // Color nombre
    const el = document.querySelector('.boton-home') as HTMLElement;
    el.style.setProperty('--color', this.perfil.colores.iconHomeTab)
    el.style.setProperty('--background', this.perfil.colores.iconosTabs)

    // // Color puesto
    // const puesto = document.querySelector('.puesto') as HTMLElement;
    // puesto.style.setProperty('color', this.perfil.colores.puesto)

    // // Color Titulo contacto
    // const colorContacto: any = document.getElementsByClassName('colorContacto') as HTMLCollectionOf<HTMLElement>;
    // for (const b of colorContacto) {
    //   b.style.setProperty('color', `${this.perfil.colores.contactoTitulo}`)
    // }
    // const bordes: any = document.getElementsByClassName('border-contacto') as HTMLCollectionOf<HTMLElement>;
    // for (const b of bordes) {
    //   b.style.setProperty('border-bottom', `${this.perfil.colores.contactoTitulo} 1px solid`)
    // }

    // // Color Fill icon
    // const botones: any = document.getElementsByClassName('botones') as HTMLCollectionOf<HTMLElement>;
    // for (const b of botones) {
    //   b.style.setProperty('color', this.perfil.colores.botonesFill)
    //   b.style.setProperty('--color', this.perfil.colores.botonesText)
    //   b.style.setProperty('--background', this.perfil.colores.botonesFill)
    // }
    
    // const iconos: any = document.getElementsByClassName('iconos') as HTMLCollectionOf<HTMLElement>;
    // for (const i of iconos) {
    //   i.style.setProperty('--color', this.perfil.colores.iconosText)
    // }
  }

}
