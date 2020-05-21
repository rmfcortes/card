import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { CommonService } from '../../services/common.service';

import { PrincipalPersona } from '../../interfaces/perfil.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  error: string
  perfil: PrincipalPersona
  navegando = false

  perfilSub: Subscription;

  constructor(
    private contacts: Contacts,
    private inAppBrowser: InAppBrowser,
    private socialSharing: SocialSharing,
    private commonService: CommonService,
  ) {}

  async ngOnInit() {
    this.getPerfil()
  }

  getPerfil() {
    this.perfilSub = this.commonService.perfil.subscribe(perfil => this.perfil = perfil)
  }

      // Acciones
  goPage(page: string) {
    console.log(page);
    this.inAppBrowser.create(page, '_self');
    this.navegando = true;
  }

  contactar(funcion: string) {
    switch (funcion) {
      case 'llamar': {
        this.llamar()
        break
      }
      case 'whats': {
        this.sendWhats()
        break
      }
      case 'addContact': {
        this.addContact()
        break
      }
      default: break;
    }
  }

  llamar() {
    window.open(`tel:${this.perfil.telefono}`, '_system');
  }

  sendWhats() {
    const tel = '+52' + this.perfil.whats;
    this.socialSharing.shareViaWhatsAppToReceiver(
      tel,
      'Hola, vi tu tarjeta de presentación digital y me interesa más información'
    )
    .catch(err => alert('Error ' + err));
  }

  addContact() {
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(this.perfil.nombre);
    if (this.perfil.whats) contact.phoneNumbers = [new ContactField('mobile', this.perfil.whats, true)];
    if (this.perfil.telefono) contact.phoneNumbers = [new ContactField('work', this.perfil.telefono, false)];
    contact.save().then(
      () => this.commonService.presentToast(`Ahora ${this.perfil.nombre} está en tu lsta de contactos`),
      (error: any) => console.error('Error saving contact.', error)
    );
  }

  ngOnDestroy(): void {
    if(this.perfilSub) this.perfilSub.unsubscribe()
  }

}
