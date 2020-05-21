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
    this.infoSub = this.commonService.perfil.subscribe(resp => this.perfil = resp)
  }


}
