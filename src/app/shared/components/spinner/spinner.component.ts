import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
    selector: 'mg-spinner',
    imports: [CommonModule],
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
constructor(
  public spinner: SpinnerService
){}
}
