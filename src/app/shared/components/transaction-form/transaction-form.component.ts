import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaccion } from 'src/app/core/model/transaccion.model';
import { TransaccionService } from 'src/app/core/services/transaccion';
import { ModalController } from '@ionic/angular';
import { TipoTansanccion } from 'src/app/core/constants/tipos-transaccion.constant';
import { CATEGORIAS } from 'src/app/core/constants/categorias.constant';
import { ToastService } from 'src/app/core/services/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  standalone: false,
})
export class TransactionFormComponent implements OnInit {

  @Input() transaccion?: Transaccion;

  form: FormGroup;
  categorias = CATEGORIAS;
  tipos = TipoTansanccion;
  categoriasNombres: string[] = [];
  foto: string | null = null;

  constructor(
    private fb: FormBuilder,
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController,
    private toast: ToastService,
    private router: Router
  ){

    this.form = this.fb.group({

      tipo: ['Gasto', Validators.required],

      categoria: ['', Validators.required],

      monto: [null, [Validators.required, Validators.min(1)]],

      fecha: [new Date().toISOString(), Validators.required],

      descripcion: ['']

    });

  }

  ngOnInit(){

    this.categoriasNombres = this.categorias.map(c => c.nombre);

    if(this.transaccion){

      this.form.patchValue({

        tipo: this.transaccion.tipo,
        categoria: this.transaccion.categoria,
        monto: this.transaccion.monto,
        fecha: this.transaccion.fecha,
        descripcion: this.transaccion.descripcion

      });

      this.foto = this.transaccion.foto || null;

    }

  }

cancelar(){

  if(this.form.dirty){

    if(confirm('¿Deseas cancelar la creación de la transacción?')){
      this.router.navigate(['/tabs/transacciones']);
    }

  }else{

    this.router.navigate(['/tabs/transacciones']);

  }

}

  guardar(){

    if(this.form.invalid) return;

    const data = this.form.value;

    if(this.transaccion){

      const actualizada: Transaccion = {

        ...this.transaccion,
        tipo: data.tipo,
        categoria: data.categoria,
        monto: Number(data.monto),
        fecha: new Date(data.fecha),
        descripcion: data.descripcion,
        foto: this.foto

      };

      this.transaccionService.updateTransaccion(actualizada);
      this.toast.show('Transacción actualizada', 'warning');

    }else{

      this.transaccionService.addTransaccion({

        tipo: data.tipo,
        categoria: data.categoria,
        monto: Number(data.monto),
        fecha: new Date(data.fecha),
        descripcion: data.descripcion,
        foto: this.foto

      });
      this.toast.show('Transacción creada', 'success');

    }

    this.modalCtrl.dismiss(null, 'confirm');

  }

}
