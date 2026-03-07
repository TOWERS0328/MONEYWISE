export interface Transaccion {

  id: string;

  tipo: 'ingreso' | 'gasto';

  categoria: string;

  fecha: string;

  monto: number;

  descripcion?: string;

  
 foto?: string | null;      // ← agregar | null
  comprobante?: string | null;

}
