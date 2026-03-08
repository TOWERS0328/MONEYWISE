import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  standalone: false,
})
export class SelectFieldComponent {

  @Input() label!: string;

  @Input() options:any[] = [];

  @Input() value:any;

  @Input() error?:string;

  @Output() valueChange = new EventEmitter<any>();

  onChange(event:any){
    this.valueChange.emit(event.detail.value);
  }

}
