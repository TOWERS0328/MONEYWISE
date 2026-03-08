import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  standalone: false,
})
export class DateFieldComponent {

 @Input() label!: string;

  @Input() value!: Date;

  @Input() error?:string;

  @Output() valueChange = new EventEmitter<any>();

  onChange(event:any){
    this.valueChange.emit(event.detail.value);
  }

}
