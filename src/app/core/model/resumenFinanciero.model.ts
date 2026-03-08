import { Categoria } from './categoria.model';

export interface ResumenFinanciero {
    saldoActual: number;
  totalIngresos: number;
  totalGastos: number;
  gastosPorCategoria: {
    categoria: Categoria['nombre'];
    monto: number;
    porcentaje: number;
  }[];
}
