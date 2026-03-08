import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared-module'; // ← agregar

import { ListaTransaccionesPage } from './lista-transacciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, // ← agregar
  ],
  declarations: [ListaTransaccionesPage]
})
export class ListaTransaccionesPageModule {}
