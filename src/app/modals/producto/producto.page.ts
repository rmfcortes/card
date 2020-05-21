import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/productos.interface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  @Input() producto: Producto

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  regresar() {
    this.modalCtrl.dismiss()
  }

}
