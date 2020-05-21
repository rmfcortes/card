import { Component, OnInit } from '@angular/core';

import { CommonService } from 'src/app/services/common.service';
import { PerfilService } from 'src/app/services/perfil.service';

import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';
import { Pasillo, Producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  // @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;


  perfil: PrincipalPersona
  error: string;
  pasillos: Pasillo[] = [];
  vista: string;

  infiniteCall: number;
  productosCargados: number;
  yPasillo = 0;

  batch = 4;
  lastKey = '';
  noMore = false;

  pasilloFiltro = '';
  cambiandoPasillo = false;

  cargandoProds = true;
  hasOfertas = false;
  infoReady = false;

  constructor(
    private commonService: CommonService,
    private perfilService: PerfilService,
  ) { }

  async ngOnInit() {
    await this.commonService.showLoaderMain()
    this.getPerfil()
  }

  async getPerfil() {
    this.perfil = this.perfilService.getPerfil()
    if (this.perfil) {
      this.getPasillos()
      this.setBackgroundColor(this.perfil.colores.background || null)
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
        this.getPasillos()
        this.setBackgroundColor(perfil.colores.background || null)
      })
      .catch(err => this.error = err)
    }
  }

  getPasillos() {
    this.perfilService.getPasillos()
    .then(pasillos => {
      this.pasillos = pasillos
      this.pasillos = this.pasillos.sort((a, b) => a.prioridad - b.prioridad)
      this.vista = this.perfil.vista
      this.setSegmentColor()
      this.initGetProds()
    })
    .catch(err => this.error = err)
  }

  initGetProds() {
    this.infiniteCall = 1;
    this.productosCargados = 0;
    this.getProds();
  }

  async getProds(event?) {
    this.cargandoProds = true;
    return new Promise(async (resolve, reject) => {
      const productos = await this.perfilService
      .getProductos(this.batch + 1, this.lastKey, this.pasillos[this.yPasillo].nombre);
      this.cambiandoPasillo = false;
      if (productos && productos.length > 0) {
        this.lastKey = productos[productos.length - 1].id;
        this.evaluaProdsLista(productos, event);
      } else if ( this.yPasillo + 1 < this.pasillos.length ) {
        this.yPasillo++;
        this.lastKey = null;
        if (this.productosCargados < this.batch * this.infiniteCall) {
          this.getProds();
        }
      } else {
        this.noMore = true;
        this.infoReady = true;
        this.cargandoProds = false;
        if (event) { event.target.complete(); }
        resolve();
      }
    });
  }

  async evaluaProdsLista(productos, event?) {
    if (productos.length === this.batch + 1) {
      productos.pop();
      return await this.agregaProductos(productos, event);
    } else if (productos.length === this.batch && this.yPasillo + 1 < this.pasillos.length) {
      return await this.nextPasillo(productos, event);
    } else if (this.yPasillo + 1 >= this.pasillos.length) {
      this.noMore = true;
      if (event) { event.target.complete(); }
      return await this.agregaProductos(productos, event);
    }
    if (productos.length < this.batch && this.yPasillo + 1 < this.pasillos.length) {
      await this.nextPasillo(productos, event);
      if (this.productosCargados < this.batch * this.infiniteCall) {
        return this.getProds();
      }
    } else {
      this.agregaProductos(productos, event);
      this.noMore = true;
    }
  }

  async nextPasillo(productos, event?) {
    return new Promise(async (resolve, reject) => {
      await this.agregaProductos(productos, event);
      this.yPasillo++;
      this.lastKey = null;
      resolve();
    });
  }

  async agregaProductos(prod: Producto[], event?) {
    return new Promise(async (resolve, reject) => {
      this.productosCargados += prod.length;
      let productos = this.pasillos[this.yPasillo].productos;
      if ( productos && productos.length > 0) {
        this.pasillos[this.yPasillo].productos = productos.concat(prod);
      } else {
        this.pasillos[this.yPasillo].productos = prod;
      }
      if (event) { event.target.complete(); }
      resolve();
      console.log(this.pasillos);
      this.infoReady = true;
      this.cargandoProds = false;
      this.setEncabezadoColor()
    });
  }

  loadDataLista(event) {
    if (this.cambiandoPasillo) {
      event.target.complete();
      return;
    }
    this.infiniteCall++;
    if (this.noMore) {
      event.target.disabled = true;
      event.target.complete();
      return;
    }
    this.getProds(event);

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (this.noMore) {
      event.target.disabled = true;
    }
  }

  resetProds(pasillo?) {
    this.cambiandoPasillo = true;
    this.lastKey = '';
    this.yPasillo = 0;
    this.pasillos.forEach(p => {
      p.productos = []
    })
    this.productosCargados = 0;
    this.infiniteCall = 1;
    this.noMore = false;
    // this.infiniteScroll.disabled = false;
    this.pasilloFiltro = pasillo;
    if (!pasillo || pasillo === 'Ofertas') {
      this.getProds();
    } else {
      // this.getProdsFiltrados();
    }
  }


      // Color de inicio
  setBackgroundColor(color: string): void {
    const fondos: any = document.getElementsByClassName('fondo') as HTMLCollectionOf<HTMLElement>;
    for (const b of fondos) {
      b.style.setProperty('--background', color)
    }

    this.commonService.hideLoader()
  }

  setSegmentColor() {
    const botones = document.querySelector('.segment-button-todos') as HTMLElement;
    botones.style.setProperty('--color', this.perfil.colores.segmentButton)
    botones.style.setProperty('--color-checked', `${this.perfil.colores.segmentButtonFocused}`)
    botones.style.setProperty('--color-focused', `${this.perfil.colores.segmentButtonFocused}`)

    const c = document.createElement('style')
    c.type = 'text/css'
    c.innerHTML = '.cssClass {color: #F00;}'
    

  //   setTimeout(() => {      
  //     const segmentButton: any = document.getElementsByClassName('segment-button') as HTMLCollectionOf<HTMLElement>;
  //     for (const b of segmentButton) {
  //       b.style.setProperty('--color', `${this.perfil.colores.segmentButton}`)
  //       b.style.setProperty('--color-checked', `${this.perfil.colores.segmentButtonFocused}`)
  //       b.style.setProperty('--color-focused', `${this.perfil.colores.segmentButtonFocused}`)
  //     }
  //   }, 300);
  }

  setEncabezadoColor() {
    setTimeout(() => {      
      const segmentButton: any = document.getElementsByClassName('encabezado') as HTMLCollectionOf<HTMLElement>;
      for (const b of segmentButton) {
        b.style.setProperty('color', `${this.perfil.colores.segmentButton}`)
      }
    }, 300);
  }

}
