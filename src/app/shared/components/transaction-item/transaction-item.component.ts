import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CATEGORIAS } from 'src/app/core/constants/categorias.constant';
import { Transaccion } from 'src/app/core/model/transaccion.model';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: false,
})
export class TransactionItemComponent {

  @Input() transaccion!: Transaccion;

  @Output() clickItem = new EventEmitter<string>();

  onClick(){
    this.clickItem.emit(this.transaccion.id);
  }

}
