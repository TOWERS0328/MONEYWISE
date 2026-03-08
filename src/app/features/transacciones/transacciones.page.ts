import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TipoTransaccion } from 'src/app/core/constants/tipos-transaccion.constant';
import { Categoria } from 'src/app/core/model/categoria.model';
import { Transaccion } from 'src/app/core/model/transaccion.model';
import { AuthService } from 'src/app/core/services/auth';
import { ToastService } from 'src/app/core/services/toast';
import { TransaccionService } from 'src/app/core/services/transaccion';
import { TransactionFormComponent } from 'src/app/shared/components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones/lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones/lista-transacciones.page.scss'],
  standalone: false,
})
export class ListaTransaccionesPage implements OnInit {

  transacciones$: Observable<Transaccion[]>;

  tipoFiltro: TipoTransaccion | 'todos' = 'todos';
  categoriaFiltro: Categoria['nombre'] | 'todas' = 'todas';
  textoBusqueda = '';

  constructor(
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private alertCtrl: AlertController
  ) {
    this.transacciones$ = this.transaccionService.transacciones$;
  }

  ngOnInit() {}

  async abrirFormulario() {

    const modal = await this.modalCtrl.create({
      component: TransactionFormComponent
    });

    await modal.present();
  }

  abrirDetalle(id: string){

  this.router.navigate(['/tabs/transacciones/detalle', id]);

}

  async logout(){

  const alert = await this.alertCtrl.create({

    header: 'Cerrar sesión',

    message: '¿Seguro que deseas cerrar sesión?',

    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Salir',
        role: 'destructive',
        handler: () => {

          this.authService.logout();
          this.toast.show('Sesión cerrada', 'medium');
          this.router.navigateByUrl('/auth/login', { replaceUrl: true });

        }
      }
    ]

  });

  await alert.present();

}

}
