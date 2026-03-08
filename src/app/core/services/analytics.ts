import { Injectable } from '@angular/core';
import { Transaccion } from '../model/transaccion.model';
import { CATEGORIAS } from '../constants/categorias.constant';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  calcularSaldo(transacciones: Transaccion[]): number {

    return transacciones.reduce((acc, t) => {
      return t.tipo === 'Ingreso'
        ? acc + t.monto
        : acc - t.monto;
    }, 0);

  }

  totalIngresos(transacciones: Transaccion[]): number {

    return transacciones
      .filter(t => t.tipo === 'Ingreso')
      .reduce((acc, t) => acc + t.monto, 0);

  }

  totalGastos(transacciones: Transaccion[]): number {

    return transacciones
      .filter(t => t.tipo === 'Gasto')
      .reduce((acc, t) => acc + t.monto, 0);

  }

 gastosPorCategoria(transacciones: Transaccion[]) {

  const gastos = transacciones.filter(t => t.tipo === 'Gasto');

  const categorias: Record<string, number> = {};

  CATEGORIAS.forEach(c => {
    categorias[c.nombre] = 0;
  });

  gastos.forEach(t => {
    categorias[t.categoria] += t.monto;
  });

  return categorias;

}

}
