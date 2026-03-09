import { Categoria } from '../model/categoria.model';

export const CATEGORIAS: Categoria[] = [

  {
    nombre: 'Alimentación',
    icono: 'restaurant',
    color: '#2ac64c'   // verde principal  — igual que $green
  },

  {
    nombre: 'Transporte',
    icono: 'car',
    color: '#7c5cfc'   // púrpura          — igual que $purple
  },

  {
    nombre: 'Vivienda',
    icono: 'home',
    color: '#48dbfb'   // cyan             — acento frío
  },

  {
    nombre: 'Salud',
    icono: 'medkit',
    color: '#1a8c34'   // verde oscuro     — igual que $green-dark
  },

  {
    nombre: 'Ocio',
    icono: 'game-controller',
    color: '#ff9f43'   // naranja ámbar    — acento cálido
  },

  {
    nombre: 'Salario',
    icono: 'cash',
    color: '#3fcc5e'   // verde medio      — entre $green y $green-dark
  },

  {
    nombre: 'Otros',
    icono: 'apps',
    color: '#ff4d4d'   // rojo             — igual que $red
  }

];
