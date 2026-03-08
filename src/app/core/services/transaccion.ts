import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaccion } from '../model/transaccion.model';
import { StorageService } from './storage';
import { AuthService } from './auth';

const TRANSACCIONES_KEY = 'transacciones';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private transaccionesSubject = new BehaviorSubject<Transaccion[]>([]);
  transacciones$ = this.transaccionesSubject.asObservable();

  constructor(
    private storage: StorageService,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(() => {
    this.loadTransacciones();
  });
  }

 private loadTransacciones() {

  const all = this.storage.getItem<Transaccion[]>(TRANSACCIONES_KEY) || [];
  const user = this.authService.getCurrentUser();

  if (!user) {
    this.transaccionesSubject.next([]);
    return;
  }

  const userTransacciones = all.filter(t => t.userId === user.email);
  userTransacciones.sort((a, b) =>
  new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
);

this.transaccionesSubject.next(userTransacciones);

}

  addTransaccion(transaccion: Omit<Transaccion, 'id' | 'userId'>) {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const nueva: Transaccion = {
      ...transaccion,
      id: crypto.randomUUID(),
      userId: user.email
    };

    const all = this.storage.getItem<Transaccion[]>(TRANSACCIONES_KEY) || [];
    all.push(nueva);
    this.storage.setItem(TRANSACCIONES_KEY, all);

    this.loadTransacciones();
  }

  deleteTransaccion(id: string) {
    const all = this.storage.getItem<Transaccion[]>(TRANSACCIONES_KEY) || [];
    const updated = all.filter(t => t.id !== id);

    this.storage.setItem(TRANSACCIONES_KEY, updated);
    this.loadTransacciones();
  }

  getSaldo(): number {
    return this.transaccionesSubject.value.reduce((acc, t) => {
      return t.tipo === 'Ingreso'
        ? acc + t.monto
        : acc - t.monto;
    }, 0);
  }

  getTotalIngresos(): number {
    return this.transaccionesSubject.value
      .filter(t => t.tipo === 'Ingreso')
      .reduce((acc, t) => acc + t.monto, 0);
  }

  getTotalGastos(): number {
    return this.transaccionesSubject.value
      .filter(t => t.tipo === 'Gasto')
      .reduce((acc, t) => acc + t.monto, 0);
  }

  updateTransaccion(transaccionActualizada: Transaccion){

  const all = this.storage.getItem<Transaccion[]>(TRANSACCIONES_KEY) || [];

  const index = all.findIndex(t => t.id === transaccionActualizada.id);

  if(index !== -1){
    all[index] = transaccionActualizada;
  }

  this.storage.setItem(TRANSACCIONES_KEY, all);

  this.loadTransacciones();

}
}

export { Transaccion };
