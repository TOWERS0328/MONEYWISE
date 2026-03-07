import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionFormComponent } from 'src/app/shared/components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.page.html',
  styleUrls: ['./transacciones.page.scss'],
  standalone: false
})
export class TransaccionesPage implements OnInit {

  transacciones: any[] = [
    {
      descripcion: 'Hamburguesa',
      categoria: 'comida',
      monto: 12.5,
      tipo: 'gasto',
      fecha: '2025-03-15'
    },
    {
      descripcion: 'Bus',
      categoria: 'transporte',
      monto: 3,
      tipo: 'gasto',
      fecha: '2025-03-14'
    },
    {
      descripcion: 'Salario',
      categoria: 'salario',
      monto: 1200,
      tipo: 'ingreso',
      fecha: '2025-03-13'
    }
  ];

  transaccionesFiltradas: any[] = [];

  filtroTipo: string = '';
  filtroCategoria: string = '';
  textoBusqueda: string = '';

  transaccionSeleccionada: any = null;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.transaccionesFiltradas = [...this.transacciones];
  }

  aplicarFiltros() {

    this.transaccionesFiltradas = this.transacciones.filter(t => {

      const coincideTipo =
        !this.filtroTipo || t.tipo === this.filtroTipo;

      const coincideCategoria =
        !this.filtroCategoria || t.categoria === this.filtroCategoria;

      const coincideBusqueda =
        !this.textoBusqueda ||
        t.descripcion.toLowerCase().includes(this.textoBusqueda.toLowerCase());

      return coincideTipo && coincideCategoria && coincideBusqueda;

    });

  }

  async nuevaTransaccion() {

    console.log('Botón presionado');

    const modal = await this.modalController.create({
      component: TransactionFormComponent
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.transacciones.push(data);
      this.aplicarFiltros();
    }

  }

  filtrarTipo(tipo: string) {
    this.filtroTipo = tipo;
    this.aplicarFiltros();
  }

  filtrarCategoria(categoria: string) {
    this.filtroCategoria = categoria;
    this.aplicarFiltros();
  }

  buscar(texto: string) {
    this.textoBusqueda = texto;
    this.aplicarFiltros();
  }

  verDetalle(transaccion: any) {
    this.transaccionSeleccionada = transaccion;
  }

}