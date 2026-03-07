import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaccion } from 'src/app/core/model/transaccion.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  standalone: false
})
export class TransactionFormComponent {

  @Input() transaccion!: Transaccion;

  constructor(private modalController: ModalController) {}

  guardar() {
    this.modalController.dismiss(this.transaccion);
  }

  cancelar() {
    this.modalController.dismiss();
  }

}