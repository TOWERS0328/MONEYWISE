import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  standalone: false,
})
export class InputFieldComponent  {

  @Input() label!: string;

  @Input() type = 'text';

  @Input() placeholder = '';

  @Input() value: any;

  @Input() error?: string;

  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<any>();

  onChange(event:any){
    this.valueChange.emit(event.detail.value);
  }

}
