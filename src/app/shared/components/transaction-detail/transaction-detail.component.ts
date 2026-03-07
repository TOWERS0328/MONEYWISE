
import { Transaccion } from 'src/app/core/model/transaccion.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  standalone:false
})
export class TransactionDetailComponent {

  @Input() transaccion!: Transaccion;

  @Output() onEdit = new EventEmitter<Transaccion>();
  @Output() onDelete = new EventEmitter<Transaccion>();

}
