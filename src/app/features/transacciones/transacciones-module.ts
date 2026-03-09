import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared-module';
import { TransaccionesRoutingModule } from './transacciones-routing-module';
// ❌ Eliminar import de ListaTransaccionesPage
import { DetalleTransaccionPage } from './detalle-transaccion/detalle-transaccion.page';

@NgModule({
  declarations: [
    DetalleTransaccionPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransaccionesRoutingModule,
    SharedModule,
  ]
})
export class TransaccionesModule { }
