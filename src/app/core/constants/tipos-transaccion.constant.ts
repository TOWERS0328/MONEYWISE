export const TipoTansanccion = [
  'Ingreso',
  'Gasto'
] as const;

export type TipoTransaccion = typeof TipoTansanccion[number];
