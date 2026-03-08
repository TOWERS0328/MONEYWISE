import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: false,
})
export class DateFormatPipe implements PipeTransform {

    transform(value: Date | string): string {

    if (!value) return '';

    const fecha = new Date(value);
    const hoy = new Date();

    const diff = hoy.getTime() - fecha.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';

    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  }

}
