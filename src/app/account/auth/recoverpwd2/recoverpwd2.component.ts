import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { logo, projectName } from 'src/app/app-const';
import { AuthenticationService } from '../../../core/services/auth.service';

function CustomConfirmPAssValidation(control: UntypedFormGroup) {
  const pass = control.get('password')?.value;
  const confirmPass = control.get('confirmPass')?.value;
  pass === confirmPass ? null : control.get('confirmPass')?.setErrors({ confirmPass: true });

  return null;
}

@Component({
    selector: 'app-recoverpwd2',
    templateUrl: './recoverpwd2.component.html',
    styleUrls: ['./recoverpwd2.component.scss'],
    standalone: false
})
export class Recoverpwd2Component implements OnInit {
  projectName = projectName.en;
  // set the currenr year
  year: number = new Date().getFullYear();
  logos = logo;
  resetForm: UntypedFormGroup = new UntypedFormGroup({});
  submitted = false;
  error = '';
  success = '';
  loading = false;

  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]],
    }, {
      validators: [CustomConfirmPAssValidation]
    });
  }


  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm?.invalid) {
      Object.values(this.resetForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          // control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    console.log(this.resetForm?.value);
    

  }

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }
}
