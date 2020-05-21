import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setAppTheme(colores) {
    const themeWrapper = document.querySelector('body')

    themeWrapper.style.setProperty('--primaryColor', 'purple')
  }

}
