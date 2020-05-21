import { Component, OnInit } from '@angular/core';

import { PerfilService } from '../services/perfil.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
    private activatedRoute: ActivatedRoute,
    private perfilService: PerfilService,
  ) {}

  ngOnInit(): void {
    const parsedURL = new URL (window.location.href)
    const host = parsedURL.origin
    if (host) {
      // this.perfilService.getId(host);
    } else {
      // Planilla para pantalla principal
    }
  }

}
