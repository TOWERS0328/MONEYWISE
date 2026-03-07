export interface Categoria {
  id: string;
  nombre: string;
  tipo: 'ingreso' | 'gasto';
  icono?: string;
  color?: string;
}
