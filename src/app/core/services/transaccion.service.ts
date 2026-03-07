import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaccion } from '../model/transaccion.model';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'transacciones';

@Injectable({ providedIn: 'root' })
export class TransaccionService {
  private _transacciones = new BehaviorSubject<Transaccion[]>([]);
  transacciones$ = this._transacciones.asObservable();

  constructor(private storageService: StorageService) {
    this.cargarDesdeStorage();
  }

  private async cargarDesdeStorage() {
    const data = await this.storageService.get(STORAGE_KEY);
    this._transacciones.next(data ?? []);
  }

  private async guardarEnStorage() {
    await this.storageService.set(STORAGE_KEY, this._transacciones.value);
  }

  getTransacciones(): Transaccion[] {
    return this._transacciones.value;
  }

  async agregarTransaccion(transaccion: Transaccion) {
    const actual = this._transacciones.value;
    this._transacciones.next([...actual, transaccion]);
    await this.guardarEnStorage();
  }

  async eliminarTransaccion(id: string) {
    const filtradas = this._transacciones.value.filter(t => t.id !== id);
    this._transacciones.next(filtradas);
    await this.guardarEnStorage();
  }

  getTransaccionById(id: string): Transaccion | undefined {
    return this._transacciones.value.find(t => t.id === id);
  }

  async actualizarTransaccion(actualizada: Transaccion) {
    const lista = this._transacciones.value.map(t =>
      t.id === actualizada.id ? actualizada : t
    );
    this._transacciones.next(lista);
    await this.guardarEnStorage();
  }
}
