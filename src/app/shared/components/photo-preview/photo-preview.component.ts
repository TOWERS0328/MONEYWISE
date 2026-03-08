import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
  standalone: false,
})
export class PhotoPreviewComponent {

  @Input() src!: string;

  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Output() photoClick = new EventEmitter<void>();

  onClick(){
    this.photoClick.emit();
  }

}
