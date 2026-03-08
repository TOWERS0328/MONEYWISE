import { Categoria } from './categoria.model';
import{TipoTansanccion, TipoTransaccion} from '../constants/tipos-transaccion.constant';

export interface Transaccion {
  id: string;
  userId: string;
  tipo: TipoTransaccion;
  categoria: Categoria['nombre']
  monto: number;
  fecha: Date;
  descripcion?: string;
  foto?: string | null;

}
