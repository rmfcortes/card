import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  titleMode = 'hide';
  position = 'center';
  infoReady = false;

  infoSub: Subscription;

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.infoSub = this.commonService.infoReady.subscribe(resp => {
      this.infoReady = resp
    })
  }

}
