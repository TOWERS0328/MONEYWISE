import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: false
})
export class FilterBarComponent {

  @Input() tipoSeleccionado: string = '';
  @Input() categoriaSeleccionada: string = '';

  @Output() tipoChange = new EventEmitter<string>();
  @Output() categoriaChange = new EventEmitter<string>();
  @Output() buscarChange = new EventEmitter<string>();

  onTipoChange(event: any) {
    this.tipoChange.emit(event.detail.value || '');
  }

  onCategoriaChange(event: any) {
    this.categoriaChange.emit(event.detail.value || '');
  }

  onBuscarChange(event: any) {
    this.buscarChange.emit(event.detail.value || '');
  }

}
