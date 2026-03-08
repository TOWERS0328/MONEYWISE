import { Component, EventEmitter, Output } from '@angular/core';
import { CATEGORIAS } from 'src/app/core/constants/categorias.constant';
import { TipoTansanccion } from 'src/app/core/constants/tipos-transaccion.constant';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: false,
})
export class FilterBarComponent {

  @Output() tipoChange = new EventEmitter<string>();

  @Output() categoriaChange = new EventEmitter<string>();

  @Output() buscarChange = new EventEmitter<string>();

  tipos = TipoTansanccion;
  categorias = CATEGORIAS;

}
