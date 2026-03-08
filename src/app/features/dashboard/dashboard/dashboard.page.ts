import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/core/services/transaccion';
import { AnalyticsService } from 'src/app/core/services/analytics';
import { Transaccion } from 'src/app/core/model/transaccion.model';
import { AuthService } from 'src/app/core/services/auth';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {

  saldo = 0;
  ingresos = 0;
  gastos = 0;

  categorias: Record<string, number> = {};

  constructor(
    private transaccionService: TransaccionService,
    private analytics: AnalyticsService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {

    this.transaccionService.transacciones$.subscribe(t => {

      this.saldo = this.analytics.calcularSaldo(t);

      this.ingresos = this.analytics.totalIngresos(t);

      this.gastos = this.analytics.totalGastos(t);

      this.categorias = this.analytics.gastosPorCategoria(t);

    });

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
