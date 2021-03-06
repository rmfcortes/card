import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { PrincipalPersona, HostRegistrados } from '../interfaces/perfil.interface';
import { UidService } from './uid.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  perfil: PrincipalPersona;

  constructor(
    private db: AngularFireDatabase,
    private uidService: UidService,
  ) { }

  getId(host: string): Promise<PrincipalPersona> {
    return new Promise((resolve, reject) => {
      try {        
        const idSub = this.db.list(`hosts`, data => data.orderByChild('host').equalTo(host))
        .valueChanges().subscribe((hosts: HostRegistrados[]) => {
          idSub.unsubscribe();
          this.uidService.setUid(hosts[0].id)
          return resolve(this.getInfoPrincipal());
        });
      } catch (error) {
        alert(error);
        const err = {
          when: Date.now(),
          error
        }
        this.db.list(`errores/getting_id`).push(err);
        reject(error);
      }
    });
  }

  getInfoPrincipal(): Promise<PrincipalPersona> {
    return new Promise((resolve, reject) => {
      try {
        const idNegocio = this.uidService.getUid()
        const prinSub = this.db.object(`principal/${idNegocio}`).valueChanges().subscribe((pri: PrincipalPersona) => {
          prinSub.unsubscribe();
          return resolve(pri);
        });
      } catch (error) {
        alert(error);
        const err = {
          en: 'Al obtener Info Principal',
          when: Date.now(),
          error
        }
        this.db.list(`errores/getting_mainInfo`).push(err);
        reject(error);
      }
    });
  }

  setPerfil(perfil: PrincipalPersona) {
    this.perfil = perfil
  }

  getPerfil() {
    return this.perfil
  }


}
