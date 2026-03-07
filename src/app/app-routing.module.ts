import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module')
        .then(m => m.AuthModule)
  },

  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module')
        .then(m => m.TabsPageModule)
  },

  {
    path: '**',
    redirectTo: 'auth/login'
  },
  {
    path: 'transacciones',
    loadChildren: () => import('./tabs/transacciones/transacciones.module').then( m => m.TransaccionesPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
