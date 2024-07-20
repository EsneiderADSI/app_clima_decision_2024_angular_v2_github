import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuTabsCompComponent } from './components/menu-tabs-comp/menu-tabs-comp.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: MenuTabsCompComponent,
    children:[
      {
        path: 'home',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'personas-list',
        loadChildren: () => import('./modules/personas/personas-list/personas-list.module').then( m => m.PersonasListPageModule)
      },
      {
        path: 'personas-add',
        loadChildren: () => import('./modules/personas/personas-add/personas-add.module').then( m => m.PersonasAddPageModule)
      },
      {
        path: 'map-ideam',
        loadChildren: () => import('./modules/maps/map-ideam/map-ideam.module').then( m => m.MapIdeamPageModule)
      },
      {
        path: 'home-clima',
        loadChildren: () => import('./modules/climatologicos/home-clima/home-clima.module').then( m => m.HomeClimaPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
