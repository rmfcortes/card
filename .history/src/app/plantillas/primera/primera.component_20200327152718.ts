import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';

@Component({
  selector: 'app-primera',
  templateUrl: './primera.component.html',
  styleUrls: ['./primera.component.scss'],
})
export class PrimeraComponent implements OnInit {

  @Input() perfil: PrincipalPersona;
  @Output() red = new EventEmitter<string>();
  @Output() call = new EventEmitter<boolean>();

  constructor(
  ) { }

    // Info de inicio
  ngOnInit() { }

    // Acciones

  goPage(page: string) {
    this.red.emit(page);
  }

  llamar() {
    console.log('Llamando');
    // this.call.emit(true);
  }


}
