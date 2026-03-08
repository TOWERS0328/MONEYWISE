import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIAS } from 'src/app/core/constants/categorias.constant';

@Pipe({
  name: 'categoryIcon',
  standalone: false,
})
export class CategoryIconPipe implements PipeTransform {

  transform(categoria: string): string {
    const cat = CATEGORIAS.find(c => c.nombre === categoria);
    return cat?.icono ?? 'help-circle';
  }

}
