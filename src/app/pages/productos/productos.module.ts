import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { SharedModule } from 'src/app/shared/shared.module';

  // Vitstas
import { ListaComponent } from 'src/app/vistas/lista/lista.component';
import { CardsComponent } from 'src/app/vistas/cards/cards.component';
import { BloquesComponent } from 'src/app/vistas/bloques/bloques.component';
import { ListaImgComponent } from 'src/app/vistas/lista-img/lista-img.component';
import { GaleriaComponent } from 'src/app/vistas/galeria/galeria.component';
import { ProductoPageModule } from 'src/app/modals/producto/producto.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ProductoPageModule,
    ProductosPageRoutingModule
  ],
  declarations: [
    ProductosPage,
    CardsComponent,
    ListaComponent,
    GaleriaComponent,
    BloquesComponent,
    ListaImgComponent,
  ]
})
export class ProductosPageModule {}
