import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { PrincipalPersona } from '../interfaces/perfil.interface';
import { UidService } from './uid.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {


  constructor(
    private db: AngularFireDatabase,
    private uidService: UidService,
  ) { }

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
        this.db.list(`errores`).push(err);
        reject(error);
      }
    });
  }


}
