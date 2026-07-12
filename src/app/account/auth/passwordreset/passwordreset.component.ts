import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { logo, projectName } from 'src/app/app-const';
import { AuthenticationService } from '../../../core/services/auth.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss'],
  standalone: false
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit {
  projectName = projectName.en;
  resetForm: UntypedFormGroup = new UntypedFormGroup({});
  submitted = false;
  error = '';
  success = '';
  loading = false;
  logos = logo;


  // Sample packages for carousel
  packages = [
    {
      id: 1,
      name: 'تسجيل سهل وسريع',
      description: 'سجّل نفسك أو أبناءك في خطوات بسيطة بدون تعقيد.',
    },
    {
      id: 2,
      name: 'تسجيل سهل وسريع',
      description: 'سجّل نفسك أو أبناءك في خطوات بسيطة بدون تعقيد.',
    },
    {
      id: 3,
      name: 'تسجيل سهل وسريع',
      description: 'سجّل نفسك أو أبناءك في خطوات بسيطة بدون تعقيد.',
    },
  ];

  // Owl Carousel options
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    rtl: true,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  };

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.resetForm?.controls; }

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
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

  }
}
