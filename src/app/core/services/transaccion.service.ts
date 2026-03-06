import { Injectable } from '@angular/core';
import { Transaccion } from '../model/transaccion.model';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {

  private transacciones: Transaccion[] = [];

  constructor() {}

  // Obtener todas
  getTransacciones(): Transaccion[] {
    return this.transacciones;
  }

  // Agregar
  agregarTransaccion(transaccion: Transaccion) {
    this.transacciones.push(transaccion);
  }

  // Eliminar
  eliminarTransaccion(id: string) {
    this.transacciones = this.transacciones.filter(t => t.id !== id);
  }

  // Obtener por id
  getTransaccionById(id: string): Transaccion | undefined {
    return this.transacciones.find(t => t.id === id);
  }

  // Actualizar
  actualizarTransaccion(transaccionActualizada: Transaccion) {
    const index = this.transacciones.findIndex(t => t.id === transaccionActualizada.id);

    if (index !== -1) {
      this.transacciones[index] = transaccionActualizada;
    }
  }

}
