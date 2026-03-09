import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../features/dashboard/dashboard-module')
            .then(m => m.DashboardModule)
      },
      {
        path: 'transacciones',
        loadChildren: () =>
          import('../features/transacciones/transacciones-module')
            .then(m => m.TransaccionesModule)
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'perfil',
        loadChildren: () => import('../features/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
