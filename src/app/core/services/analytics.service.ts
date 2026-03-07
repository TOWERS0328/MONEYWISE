import { Injectable } from '@angular/core';
import { Transaccion } from '../model/transaccion.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  getTotalIngresos(transacciones: Transaccion[]): number {
    return transacciones
      .filter(t => t.tipo === 'ingreso')
      .reduce((sum, t) => sum + t.monto, 0);
  }

  getTotalGastos(transacciones: Transaccion[]): number {
    return transacciones
      .filter(t => t.tipo === 'gasto')
      .reduce((sum, t) => sum + t.monto, 0);
  }

  getSaldo(transacciones: Transaccion[]): number {
    return this.getTotalIngresos(transacciones) - this.getTotalGastos(transacciones);
  }

  getGastosPorCategoria(transacciones: Transaccion[]): { categoria: string; monto: number; porcentaje: number }[] {
    const gastos = transacciones.filter(t => t.tipo === 'gasto');
    const total = this.getTotalGastos(transacciones);

    const mapa: Record<string, number> = {};
    gastos.forEach(t => {
      mapa[t.categoria] = (mapa[t.categoria] ?? 0) + t.monto;
    });

    return Object.entries(mapa).map(([categoria, monto]) => ({
      categoria,
      monto,
      porcentaje: total > 0 ? (monto / total) * 100 : 0,
    }));
  }

  getTransaccionesMes(transacciones: Transaccion[], mes: number, anio: number): Transaccion[] {
    return transacciones.filter(t => {
      const fecha = new Date(t.fecha);
      return fecha.getMonth() === mes && fecha.getFullYear() === anio;
    });
  }
}
