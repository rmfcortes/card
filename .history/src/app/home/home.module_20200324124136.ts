import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

 //Plugins
import { Contacts } from '@ionic-native/contacts/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { HomePage } from './home.page';

  // Plantillas
import { PrimeraComponent } from '../plantillas/primera/primera.component';
import { SegundaComponent } from '../plantillas/segunda/segunda.component';

  //Shared components
import { PreloadImageComponent } from '../components/pre-load-image/pre-load-image.component';
import { SeparadorEstrellaComponent } from '../components/separador-estrella/separador-estrella.component';

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
    PreloadImageComponent,
    SeparadorEstrellaComponent,
  ],
  providers: [
    Contacts,
    InAppBrowser,
    SocialSharing,
  ]
})
export class HomePageModule {}
