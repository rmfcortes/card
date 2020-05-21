import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { PerfilService } from '../services/perfil.service';

import { PrincipalPersona } from '../interfaces/perfil.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild('content', {static: false}) myContent: ElementRef

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
        this.setStyle(perfil.background || null)
      })
      .catch(err => this.error = err)
    } else {
      // Planilla para pantalla principal
    }
  }

  setStyle(value: string): void {
    console.log(this.myContent);
    console.log(this.myContent.nativeElement);
    this.myContent.nativeElement.style.setProperty('--background', value); 
}

}
