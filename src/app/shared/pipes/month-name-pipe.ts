import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
  standalone: false,
})
export class MonthNamePipe implements PipeTransform {

   transform(month: number): string {

    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    return meses[month - 1] || '';

  }

}
