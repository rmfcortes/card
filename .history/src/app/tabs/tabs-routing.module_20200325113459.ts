import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  { 
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)},
      { path: 'productos', loadChildren: () => import('../pages/productos/productos.module').then( m => m.ProductosPageModule)},
      { path: 'mapa', loadChildren: () => import('../pages/mapa/mapa.module').then( m => m.MapaPageModule)}
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
