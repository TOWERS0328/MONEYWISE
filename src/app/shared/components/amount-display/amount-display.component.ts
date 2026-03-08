import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amount-display',
  templateUrl: './amount-display.component.html',
  styleUrls: ['./amount-display.component.scss'],
  standalone: false,
})
export class AmountDisplayComponent {

  @Input() monto!: number;

  @Input() tipo: 'Ingreso' | 'Gasto' | 'Neutral' = 'Neutral';

  @Input() tamano: 'small' | 'medium' | 'large' = 'medium';

}
