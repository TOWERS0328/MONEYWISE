import { Component, Input } from '@angular/core';
import { IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-progress-bar-category',
  templateUrl: './progress-bar-category.component.html',
  styleUrls: ['./progress-bar-category.component.scss'],
  standalone:false
})
export class ProgressBarCategoryComponent {

  @Input() categoria!: string;
  @Input() porcentaje!: number;
  @Input() color!: string;
  @Input() monto!: number;

}
