import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  { 
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full'},
      { path: 'home', loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)},
      { path: 'tabs', loadChildren: () => import('../tabs/tabs.module').then( m => m.TabsPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
