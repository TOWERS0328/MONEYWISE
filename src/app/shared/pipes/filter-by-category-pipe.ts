import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from 'src/app/core/model/categoria.model';
import { Transaccion } from 'src/app/core/model/transaccion.model';

@Pipe({
  name: 'filterByCategory',
  standalone: false,
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(transacciones: Transaccion[], categoria: Categoria['nombre'] | 'todas'): Transaccion[] {

    if (!categoria || categoria === 'todas') return transacciones;

    return transacciones.filter(t => t.categoria === categoria);

  }

}
