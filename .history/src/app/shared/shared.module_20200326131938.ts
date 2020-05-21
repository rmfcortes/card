import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SeparadorEstrellaComponent } from '../components/separador-estrella/separador-estrella.component';



@NgModule({
    imports: [
      CommonModule,
      IonicModule,
    ],
    declarations: [
      SeparadorEstrellaComponent
    ],
    exports: [
      SeparadorEstrellaComponent
    ]
  })

  export class SharedModule {}
