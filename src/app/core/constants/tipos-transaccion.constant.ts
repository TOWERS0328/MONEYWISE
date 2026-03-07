export const TIPOS_TRANSACCION = [
  'ingreso',
  'gasto'
] as const;

export type TipoTransaccion = typeof TIPOS_TRANSACCION[number];
