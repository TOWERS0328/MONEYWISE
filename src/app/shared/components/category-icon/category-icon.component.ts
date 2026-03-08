import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss'],
  standalone: false,
})
export class CategoryIconComponent{

  @Input() categoria!: string;

  @Input() tamano:'small'|'medium'='medium';
}
