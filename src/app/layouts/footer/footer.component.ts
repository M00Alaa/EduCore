import { Component } from '@angular/core';
import { projectName } from 'src/app/app-const';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})

/**
 * Footer component
 */
export class FooterComponent {
  projectName = projectName.en;
  // set the currenr year
  year: number = new Date().getFullYear();



}
