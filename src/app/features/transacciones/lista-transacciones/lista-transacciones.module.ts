import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared-module';
import { ListaTransaccionesPageRoutingModule } from './lista-transacciones-routing.module'; // ← AGREGAR
import { ListaTransaccionesPage } from './lista-transacciones.page';

@NgModule({
  declarations: [ListaTransaccionesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ListaTransaccionesPageRoutingModule // ← AGREGAR
  ]
})
export class ListaTransaccionesPageModule {}
