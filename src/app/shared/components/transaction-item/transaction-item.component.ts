import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaccion } from 'src/app/core/model/transaccion.model';


@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: false
})
export class TransactionItemComponent {

  @Input() transaccion: any;

  @Output() itemClick = new EventEmitter<any>();

  handleClick() {
    this.itemClick.emit(this.transaccion);
  }

}
