import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getInfo() {
    
  }
}
