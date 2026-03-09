import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIAS } from 'src/app/core/constants/categorias.constant';

@Pipe({
  name: 'categoryColor',
  standalone: false,
})
export class CategoryColorPipe implements PipeTransform {

  transform(categoria: string): string {
    if (!categoria) return '#8E9AAF';

    // Función interna para ignorar tildes, espacios y mayúsculas
    const normalize = (text: string) =>
      text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    const nombreBusqueda = normalize(categoria);

    // Buscamos en tu lista de constantes
    const cat = CATEGORIAS.find(c => normalize(c.nombre) === nombreBusqueda);

    // Si la encuentra, aplica tu color (ej. #7c5cfc), si no, el gris por defecto
    return cat?.color ?? '#8E9AAF';
  }
}
