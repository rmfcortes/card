import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { PrincipalPersona } from '../interfaces/perfil.interface';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loader;
  public perfil = new BehaviorSubject<PrincipalPersona>(null);

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
    });

    return await this.loader.present()
  }

  hideLoader() {
    this.loadCtrl.dismiss();
  }

  setInfo(perfil: PrincipalPersona) {
    this.perfil.next(perfil)
  }

}
