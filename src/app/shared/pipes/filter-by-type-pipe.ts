import { Pipe, PipeTransform } from '@angular/core';
import { TipoTransaccion } from 'src/app/core/constants/tipos-transaccion.constant';
import { Transaccion } from 'src/app/core/model/transaccion.model';

@Pipe({
  name: 'filterByType',
  standalone: false,
})
export class FilterByTypePipe implements PipeTransform {

  transform(transacciones: Transaccion[], tipo: TipoTransaccion | 'todos'): Transaccion[] {

    if (!tipo || tipo === 'todos') return transacciones;

    return transacciones.filter(t => t.tipo === tipo);

  }

}
