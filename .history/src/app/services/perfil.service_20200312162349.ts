import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  idNegocio = new BehaviorSubject<string>('');

  constructor(
    private db: AngularFireDatabase
  ) { }

  getId(negocio) {
    const idSub = this.db
  }
}
