import { Component, OnInit } from '@angular/core';

import { CommonService } from 'src/app/services/common.service';
import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  perfil: PrincipalPersona
  error: string;

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
    
        const botones = document.querySelector('.botones') as HTMLElement;
        botones.style.setProperty('color', this.perfil.colores.botonesFill)
    
        this.commonService.hideLoader()
      }

}
