import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  standalone: false
})
export class DashboardCardComponent  implements OnInit {

  @Input() titulo!: string;
  @Input() monto!: number;
  @Input() tipo!: 'ingreso'|'gasto'| 'saldo';
  @Input() icono!: string;


  constructor() { }

  ngOnInit() {}

}
