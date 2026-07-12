import { Directive, ElementRef } from '@angular/core';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[removeNgbDpDefaultValidation]',
  standalone: true,

})
export class RemoveNgbDateDatepickerDefaultValidation {
  constructor(private e: ElementRef, private dt: NgbInputDatepicker) { 
    dt.validate = () => null;
  }
}