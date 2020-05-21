import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { PrincipalPersona } from '../interfaces/perfil.interface';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loader: any;
  public infoReady = new BehaviorSubject<PrincipalPersona>(null);

  constructor(
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
  ) { }

  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async showLoaderMain() {
    this.loader = await this.loadCtrl.create({
      cssClass: 'custom-loading',
      id: 'main'
    });

    return await this.loader.present()
  }

  hideLoader() {
    console.log(this.loader);
    this.loader.dismiss('main');
  }

  setInfo(perfil: PrincipalPersona) {
    this.infoReady.next(perfil)
  }

}
