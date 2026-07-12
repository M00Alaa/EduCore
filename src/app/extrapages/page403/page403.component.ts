import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'mg-page403',
    templateUrl: './page403.component.html',
    styleUrls: ['./page403.component.scss'],
    standalone: false
})
export class Page403Component {

  constructor(
    private auth: AuthenticationService
  ){

  }

 redirect(){
  this.auth.redirectUser();
 }
  
}
