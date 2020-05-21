import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CommonService } from 'src/app/services/common.service';
import { PerfilService } from 'src/app/services/perfil.service';

import { Pasillo, Producto } from 'src/app/interfaces/productos.interface';
import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit, OnDestroy {

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

  perfilSub: Subscription;

  constructor(
    private commonService: CommonService,
    private perfilService: PerfilService,
  ) { }

  async ngOnInit() {
    this.getPerfil()
  }

  async getPerfil() {
    this.perfilSub = this.commonService.perfil.subscribe(perfil => {
      if (perfil) {
        this.perfil = perfil
        this.getPasillos()
      }
    })
  }

  getPasillos() {
    this.perfilService.getPasillos()
    .then(pasillos => {
      this.pasillos = pasillos
      this.pasillos = this.pasillos.sort((a, b) => a.prioridad - b.prioridad)
      this.vista = this.perfil.vista
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
    console.log('GetProds');
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

  ngOnDestroy() {
    if (this.perfilSub) this.perfilSub.unsubscribe()
  }

}
