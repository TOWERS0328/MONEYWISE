import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleTransaccionPage } from './detalle-transaccion/detalle-transaccion.page';
// ❌ Eliminar import de ListaTransaccionesPage

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./lista-transacciones/lista-transacciones.module')
      .then(m => m.ListaTransaccionesPageModule) // ← LAZY LOADING
  },
  {
    path: 'detalle/:id',
    component: DetalleTransaccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionesRoutingModule { }
