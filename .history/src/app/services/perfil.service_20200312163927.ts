import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { PrincipalPersona } from '../interfaces/perfil.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  public idNegocio = '';

  constructor(
    private db: AngularFireDatabase
  ) { }

  getId(negocio): Promise<PrincipalPersona> {
    return new Promise((resolve, reject) => {
      try {        
        const idSub = this.db.object(`ids/${negocio}`).valueChanges().subscribe((id: string) => {
          idSub.unsubscribe();
          this.idNegocio = id;
          return resolve(this.getInfoPrincipal());
        });
      } catch (error) {
        alert(error);
        const err = {
          en: 'Al obtener Id',
          when: Date.now(),
          error
        }
        this.db.list(`errores`).push(err);
        reject(error);
      }
    });
  }

  getInfoPrincipal(): Promise<PrincipalPersona> {
    return new Promise((resolve, reject) => {
      try {        
        const prinSub = this.db.object(`principal/${this.idNegocio}`).valueChanges().subscribe((pri: PrincipalPersona) => {
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
