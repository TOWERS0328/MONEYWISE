import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit, AfterViewInit {

  saldo: number = 0;
  ingresos: number = 0;
  gastos: number = 0;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {

    new Chart("financeChart", {
      type: 'doughnut',
      data: {
        labels: ['Ingresos', 'Gastos'],
        datasets: [{
          data: [this.ingresos, this.gastos],
          backgroundColor: [
            '#2ac64c',
            '#ff3b3b'
          ]
        }]
      }
    });

  }

}
