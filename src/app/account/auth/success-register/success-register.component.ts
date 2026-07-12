import { Component } from '@angular/core';
import { logo } from 'src/app/app-const';

@Component({
    selector: 'mg-success-register',
    templateUrl: './success-register.component.html',
    styleUrls: ['./success-register.component.scss'],
    standalone: false
})
export class SuccessRegisterComponent {
  logos = logo;
}
