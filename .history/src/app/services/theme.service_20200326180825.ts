import { Injectable } from '@angular/core';

import { PrincipalPersona } from '../interfaces/perfil.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setAppTheme(perfil: PrincipalPersona) {
    const themeWrapper = document.querySelector('body')
    console.log(perfil.colores);
    themeWrapper.style.setProperty('--direccionColor', perfil.colores.direccion)
    themeWrapper.style.setProperty('--fondoColor', perfil.colores.background)
    themeWrapper.style.setProperty('--nombreColor', perfil.colores.nombre)
    themeWrapper.style.setProperty('--puestoColor', perfil.colores.puesto)
    themeWrapper.style.setProperty('--contactoTituloColor', perfil.colores.contactoTitulo)
    themeWrapper.style.setProperty('--botonesFillColor', perfil.colores.botonesFill)
    themeWrapper.style.setProperty('--botonesTextColor', perfil.colores.botonesText)
    themeWrapper.style.setProperty('--iconosTextColor', perfil.colores.iconosText)
    themeWrapper.style.setProperty('--iconHomeColor', perfil.colores.iconHomeTab)
    themeWrapper.style.setProperty('--iconosTabs', perfil.colores.iconosTabs)
    themeWrapper.style.setProperty('--iconosTabsFocused', perfil.colores.iconosTabsFocused)

  }

}
