import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loading: any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentLoadingCustom() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box">
             <img src="assets/gifs/loading.gif" />
          </div>
        </div>`,
      duration: 5000
    });
  
    this.loading.present();
  }

}
