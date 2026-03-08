import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  standalone: false,
})
export class DashboardCardComponent{

  @Input() titulo!: string;

  @Input() monto!: number;

  @Input() tipo!: 'Ingreso' | 'Gasto' | 'Neutral';

  @Input() icono!: string;

}
