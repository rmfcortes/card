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
    const negocio: string = this.activatedRoute.snapshot.paramMap.get('negocio');
    if (negocio) {
      this.perfilService.getId(negocio);
    } else {
      // Planilla para pantalla principal
    }
  }

}
