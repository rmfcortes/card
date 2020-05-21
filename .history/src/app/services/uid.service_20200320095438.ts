import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UidService {

  uid: string;
  nombre: string;

  constructor( ) {  }

  setUid(uid: string) {
    this.uid = uid;
  }

  getUid() {
    return this.uid;
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }

  getNombre() {
    return this.nombre;
  }

}
