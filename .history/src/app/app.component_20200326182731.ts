import { Component } from '@angular/core';
import { PrincipalPersona } from './interfaces/perfil.interface';
import { PerfilService } from './services/perfil.service';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public perfil: PrincipalPersona
  error: string;

  constructor(
    private perfilService: PerfilService,
    private commonService: CommonService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.getPerfil();
  }

  async getPerfil() {
    await this.commonService.showLoaderMain()
    this.perfil = this.perfilService.getPerfil()
    if (this.perfil) {
      this.commonService.hideLoader()
      return
    }
    this.getPerfilDB()
  }

  getPerfilDB() {
    const parsedURL = new URL (window.location.href)
    const host = parsedURL.origin
    if (host) {
      this.perfilService.getId(host)
      .then(perfil => {
        this.perfil = perfil
        this.commonService.setInfo(this.perfil)
        this.commonService.hideLoader()
      })
      .catch(err => this.error = err)
    }
  }


}
