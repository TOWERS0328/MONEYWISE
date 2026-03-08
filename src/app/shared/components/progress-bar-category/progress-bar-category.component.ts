import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar-category',
  templateUrl: './progress-bar-category.component.html',
  styleUrls: ['./progress-bar-category.component.scss'],
  standalone: false,
})
export class ProgressBarCategoryComponent {

  @Input() categoria!: string;

  @Input() porcentaje!: number;

  @Input() monto!: number;

  @Input() color: string = 'danger';

}
