import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../core/services/transaccion.service';
import { Auth } from '../core/services/auth.service';
import { Transaccion } from '../core/model/transaccion.model';

@Component({
  selector: 'app-dashboard-tab1',
  templateUrl: './dashboard-tab1.page.html',
  styleUrls: ['./dashboard-tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {

  resumen = {
    saldo: 0,
    ingresosMes: 0,
    gastosMes: 0
  };

  categorias: any[] = [];

  constructor(
    private transaccionService: TransaccionService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.calcularResumen();
    this.calcularCategorias();
  }

  calcularResumen() {

    const transacciones: Transaccion[] = this.transaccionService.getTransacciones();

    const ingresos = transacciones
      .filter(t => t.tipo === 'ingreso')
      .reduce((sum, t) => sum + t.monto, 0);

    const gastos = transacciones
      .filter(t => t.tipo === 'gasto')
      .reduce((sum, t) => sum + t.monto, 0);

    this.resumen.ingresosMes = ingresos;
    this.resumen.gastosMes = gastos;
    this.resumen.saldo = ingresos - gastos;
  }

  calcularCategorias() {

    const transacciones: Transaccion[] = this.transaccionService.getTransacciones();

    const gastos = transacciones.filter(t => t.tipo === 'gasto');

    const totalGastos = gastos.reduce((sum, t) => sum + t.monto, 0);

    const mapaCategorias: any = {};

    gastos.forEach(t => {

      if (!mapaCategorias[t.categoria]) {
        mapaCategorias[t.categoria] = 0;
      }

      mapaCategorias[t.categoria] += t.monto;

    });

    this.categorias = Object.keys(mapaCategorias).map(cat => {

      const monto = mapaCategorias[cat];

      return {
        nombre: cat,
        monto: monto,
        porcentaje: totalGastos ? (monto / totalGastos) * 100 : 0,
        color: 'primary'
      };

    });

  }

  logout() {
    this.auth.logout();
  }

}
