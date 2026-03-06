import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    children: [
      {
        path: 'login',
        canActivate:[guestGuard],
        loadChildren: () =>
          import('./auth/login/login.module')
          .then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        canActivate:[guestGuard],
        loadChildren: () =>
          import('./auth/register/register.module')
          .then(m => m.RegisterPageModule)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
