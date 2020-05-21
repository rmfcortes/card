import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loader: any;

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
      cssClass: 'custom-loading'
    });

    return await this.loader.present()
  }

  hideLoader() {
    if (this.loader) this.loadCtrl.dismiss();
  }

}
