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

  ngOnInit(): void {
    this.commonService.showLoaderMain()
    const parsedURL = new URL (window.location.href)
    const host = parsedURL.origin
    if (host) {
      this.perfilService.getId(host)
      .then(perfil => {
        this.perfil = perfil
        this.setColores()
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

  // Color de inicio
  setColores(): void {
    const fondos: any = document.getElementsByClassName('fondo') as HTMLCollectionOf<HTMLElement>;
    for (const b of fondos) {
      b.style.setProperty('--background', this.perfil.colores.background)
    }
    // Color nombre
    const el = document.querySelector('.nombre') as HTMLElement;
    el.style.setProperty('color', this.perfil.colores.nombre)

    // Color puesto
    const puesto = document.querySelector('.puesto') as HTMLElement;
    puesto.style.setProperty('color', this.perfil.colores.puesto)

    // Color Titulo contacto
    const colorContacto: any = document.getElementsByClassName('colorContacto') as HTMLCollectionOf<HTMLElement>;
    for (const b of colorContacto) {
      b.style.setProperty('color', `${this.perfil.colores.contactoTitulo}`)
    }
    const bordes: any = document.getElementsByClassName('border-contacto') as HTMLCollectionOf<HTMLElement>;
    for (const b of bordes) {
      b.style.setProperty('border-bottom', `${this.perfil.colores.contactoTitulo} 1px solid`)
    }

    // Color Fill icon
    const botones: any = document.getElementsByClassName('botones') as HTMLCollectionOf<HTMLElement>;
    for (const b of botones) {
      b.style.setProperty('color', this.perfil.colores.botonesFill)
      b.style.setProperty('--color', this.perfil.colores.botonesText)
      b.style.setProperty('--background', this.perfil.colores.botonesFill)
    }
    
    const iconos: any = document.getElementsByClassName('iconos') as HTMLCollectionOf<HTMLElement>;
    for (const i of iconos) {
      i.style.setProperty('--color', this.perfil.colores.iconosText)
    }

    this.commonService.hideLoader()
  }

}
