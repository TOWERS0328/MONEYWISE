import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: false,
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number): string {

    if (!value) return '$0';

    return '$' + value.toLocaleString('es-CO');

  }

}
