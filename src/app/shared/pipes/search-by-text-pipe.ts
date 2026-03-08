import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from 'src/app/core/model/transaccion.model';

@Pipe({
  name: 'searchByText',
  standalone: false,
})
export class SearchByTextPipe implements PipeTransform {

  transform(transacciones: Transaccion[], texto: string): Transaccion[] {

    if (!texto) return transacciones;

    const t = texto.toLowerCase();

    return transacciones.filter(tr =>
      tr.descripcion?.toLowerCase().includes(t)
    );

  }

}
