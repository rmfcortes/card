import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

  // Plantillas
import { PrimeraComponent } from '../plantillas/primera/primera.component';
import { SegundaComponent } from '../plantillas/segunda/segunda.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    PrimeraComponent,
    SegundaComponent,
  ]
})
export class HomePageModule {}
