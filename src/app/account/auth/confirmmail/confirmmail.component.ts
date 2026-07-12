import { projectName } from './../../../app-const';
import { Component, OnInit } from '@angular/core';
import { logo } from 'src/app/app-const';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-confirmmail',
  templateUrl: './confirmmail.component.html',
  styleUrls: ['./confirmmail.component.scss'],
  standalone: false
})
export class ConfirmmailComponent implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();
  logos = logo;

  projectName = projectName.en;

  constructor(
    private accService: AuthenticationService
  ) { }


  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')
  }


  redirect() {
    this.accService.redirectUser();
  }
}
