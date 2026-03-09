import { Component, OnInit } from '@angular/core';

import { TransaccionService } from 'src/app/core/services/transaccion';

import { AnalyticsService } from 'src/app/core/services/analytics';

import { AuthService } from 'src/app/core/services/auth';

import { Router } from '@angular/router';

import { ToastService } from 'src/app/core/services/toast';

import { AlertController } from '@ionic/angular';

import { Chart, registerables } from 'chart.js';



@Component({

  selector: 'app-dashboard',

  templateUrl: './dashboard.page.html',

  styleUrls: ['./dashboard.page.scss'],

  standalone: false,

})

export class DashboardPage implements OnInit {



  private chart: any;



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



    Chart.register(...registerables);



    this.transaccionService.transacciones$.subscribe(t => {



      this.saldo = this.analytics.calcularSaldo(t);



      this.ingresos = this.analytics.totalIngresos(t);



      this.gastos = this.analytics.totalGastos(t);



      this.categorias = this.analytics.gastosPorCategoria(t);



      this.crearGrafico();



    });



  }



  crearGrafico() {



    const labels = Object.keys(this.categorias);

    const data = Object.values(this.categorias);



    if(this.chart){

      this.chart.destroy();

    }



    this.chart = new Chart("categoryChart", {



      type: 'doughnut',



      data: {

        labels: labels,

        datasets: [{

          data: data,

          backgroundColor: [

            '#2ac64c',

            '#1fa83f',

            '#3fcc5e',

            '#22b455',

            '#45d16b'

          ],

          borderWidth: 0

        }]

      },



      options: {



  responsive: true,



  plugins: {



    legend: {

      display: false

    }



  }





      }



    });



  }

  getIcon(categoria: string) {



  switch (categoria.toLowerCase()) {



    case 'alimentación':

      return 'fast-food-outline';



    case 'transporte':

      return 'car-outline';



    case 'vivienda':

      return 'home-outline';



    case 'salud':

      return 'medkit-outline';



    case 'ocio':

      return 'game-controller-outline';



    case 'salario':

      return 'cash-outline';



    default:

      return 'wallet-outline';

  }



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
