import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIAS } from 'src/app/core/constants/categorias.constant';

@Pipe({
  name: 'categoryColor',
  standalone: false,
})
export class CategoryColorPipe implements PipeTransform {

  transform(categoria: string): string {
    const cat = CATEGORIAS.find(c => c.nombre === categoria);
    return cat?.color ?? '#8E9AAF';  // ← fix: optional chaining + nullish coalescing
  }

}
