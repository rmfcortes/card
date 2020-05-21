import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { ThemeService } from './theme.service';
import { UidService } from './uid.service';

import { PrincipalPersona, HostRegistrados } from '../interfaces/perfil.interface';
import { Pasillo, Producto } from '../interfaces/productos.interface';



@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  perfil: PrincipalPersona;

  constructor(
    private db: AngularFireDatabase,
    private uidService: UidService,
    private themeService: ThemeService
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
        const prinSub = this.db.object(`principal/${idNegocio}/datos`).valueChanges().subscribe((pri: PrincipalPersona) => {
          prinSub.unsubscribe();
          this.setPerfil(pri)
          this.themeService.setAppTheme(pri)
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

  getPasillos(): Promise<Pasillo[]>{
    return new Promise((resolve, reject) => {
      try {
        const idNegocio = this.uidService.getUid()
        const pasSub = this.db.object(`principal/${idNegocio}/pasillos`).valueChanges().subscribe((pasillos: Pasillo[]) => {
          pasSub.unsubscribe();
          return resolve(pasillos);
        });
      } catch (error) {
        alert(error);
        const err = {
          en: 'Al obtener Pasillos',
          when: Date.now(),
          error
        }
        this.db.list(`errores/getting_pasillos`).push(err);
        reject(error);
      }
    });
  }

  getProductos(batch, lastKey, pasillo): Promise<Producto[]>{
    return new Promise((resolve, reject) => {
      const idNegocio = this.uidService.getUid()
      if (lastKey) {
        const x = this.db.list(`principal/${idNegocio}/productos/${pasillo}`, data =>
          data.orderByKey().limitToFirst(batch).startAt(lastKey)).valueChanges().subscribe(async (productos: Producto[]) => {
            x.unsubscribe();
            resolve(productos);
          });
      } else {
        const x = this.db.list(`principal/${idNegocio}/productos/${pasillo}`, data =>
          data.orderByKey().limitToFirst(batch)).valueChanges().subscribe(async (productos: Producto[]) => {
            x.unsubscribe();
            resolve(productos);
          });
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
