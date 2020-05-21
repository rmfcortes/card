import { Component, OnInit } from '@angular/core';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { PerfilService } from '../../services/perfil.service';

import { PrincipalPersona } from '../../interfaces/perfil.interface';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  error: string
  perfil: PrincipalPersona
  navegando = false;

  constructor(
    private contacts: Contacts,
    private inAppBrowser: InAppBrowser,
    private socialSharing: SocialSharing,
    private perfilService: PerfilService,
    private commonService: CommonService,
  ) {}

  async ngOnInit() {
    await this.commonService.showLoaderMain()
    this.getPerfil()
  }

  async getPerfil() {
    this.perfil = this.perfilService.getPerfil()
    if (this.perfil) {
      this.commonService.hideLoader()
      return
    }
    this.getPerfilDB()
    console.log(this.perfil);
  }

  getPerfilDB() {
    const parsedURL = new URL (window.location.href)
    const host = parsedURL.origin
    if (host) {
      this.perfilService.getId(host)
      .then(perfil => {
        this.perfil = perfil
        this.commonService.setInfo(this.perfil)
        this.commonService.hideLoader()
      })
      .catch(err => this.error = err)
    }
  }

      // Acciones
  goPage(page: string) {
    console.log(page);
    const pag = this.perfil.redes[page];
    console.log(pag);
    this.inAppBrowser.create(pag, '_self');
    this.navegando = true;
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

}
