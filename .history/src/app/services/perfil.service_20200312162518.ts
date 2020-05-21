import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  public idNegocio = '';

  constructor(
    private db: AngularFireDatabase
  ) { }

  getId(negocio) {
    const idSub = this.db.object(`ids/${negocio}`).valueChanges().subscribe((id: string) => {
      idSub.unsubscribe();
      this.idNegocio = id;
    });
  }
}
