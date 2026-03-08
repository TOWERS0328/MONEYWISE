import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransaccionService } from 'src/app/core/services/transaccion';
import { Transaccion } from 'src/app/core/model/transaccion.model';
import { AlertController, ModalController } from '@ionic/angular';
import { TransactionFormComponent } from 'src/app/shared/components/transaction-form/transaction-form.component';
import { ToastService } from 'src/app/core/services/toast';
import { PhotoGalleryModalComponent } from 'src/app/shared/components/photo-gallery-modal/photo-gallery-modal.component';

@Component({
  selector: 'app-detalle-transaccion',
  templateUrl: './detalle-transaccion.page.html',
  styleUrls: ['./detalle-transaccion.page.scss'],
  standalone: false,
})
export class DetalleTransaccionPage implements OnInit {

  transaccion!: Transaccion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController,
     private alertCtrl: AlertController,
     private toast: ToastService
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.transaccionService.transacciones$.subscribe(list => {

      this.transaccion = list.find(t => t.id === id);

    });

  }

  async eliminar(){

  if(!this.transaccion) return;

  const alert = await this.alertCtrl.create({

    header: 'Eliminar transacción',

    message: '¿Seguro que deseas eliminar esta transacción?',

    buttons: [

      {
        text: 'Cancelar',
        role: 'cancel'
      },

      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {

          this.transaccionService.deleteTransaccion(this.transaccion!.id);
          this.toast.show('Transacción eliminada', 'danger');
          this.router.navigate(['/tabs/transacciones'], { replaceUrl: true });

        }
      }

    ]

  });

  await alert.present();

}

  async editar(){

  if(!this.transaccion) return;

  const modal = await this.modalCtrl.create({

    component: TransactionFormComponent,

    componentProps: {
      transaccion: this.transaccion
    }

  });

  await modal.present();

 const { role } = await modal.onDidDismiss();

  if(role === 'confirm'){
    this.router.navigate(['/tabs/transacciones']);
  }

}

async abrirFoto(){

  if(!this.transaccion?.foto) return;

  const modal = await this.modalCtrl.create({

    component: PhotoGalleryModalComponent,

    componentProps:{
      fotos:[this.transaccion.foto],
      fotoInicial:0
    }

  });

  await modal.present();

}

volver(){

  this.router.navigate(['/tabs/transacciones']);

}

}
