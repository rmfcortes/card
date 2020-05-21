import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  icon = '../../../assets/img/pin.jpg'

  infoSub: Subscription
  perfil: PrincipalPersona

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getPerfil()
  }

  getPerfil() {
    this.infoSub = this.commonService.infoReady.subscribe(resp => {
      if (resp) {
        this.perfil = resp
      }
    })
  }

}
