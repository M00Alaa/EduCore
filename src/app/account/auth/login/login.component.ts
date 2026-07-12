import { AfterViewInit, Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLES, errorCallback, logo, noWhitespaceValidator } from 'src/app/app-const';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { AuthenticationService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})

/**
 * Login component
 */
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  logo = logo.light;

  loginForm = new FormGroup({
    userName: new FormControl(isDevMode() ? 'Jeel@gmail.com' : '', [Validators.required, noWhitespaceValidator]),
    password: new FormControl(isDevMode() ? '12345678' : '', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  returnUrl = '';

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: SpinnerService,
    private authenticationService: AuthenticationService,


  ) {
    spinner.showSpinner();
    authenticationService.identity(true).subscribe({
      next: (res) => {
        if (res) {
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.authenticationService.redirectUser();
          }
        }
        setTimeout(() => {
          spinner.hideSpinner();
        }, 1000);
      },
      error: (error) => {
        spinner.hideSpinner();
      }
    })


  }

  ngOnInit() {

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl'] || params['redirectURL']) {
        this.returnUrl = params['returnUrl'] || params['redirectURL'];
      }
    });
  }

  subs = new Subscription()
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loading = false;
  /**
   * Form submit
   */
  onSubmit() {

    if (this.loginForm.valid) {
      if (this.f.userName.value && this.f.password.value) {
        this.loading = true;
        this.subs.add(this.authenticationService.login(this.f.userName.value, this.f.password.value, this.f.rememberMe.value!).subscribe(
          {
            next: data => {
              this.loading = false;
              this.subs.add(this.authenticationService.identity(true).subscribe({
                next: (res) => {
                  if (res) {
                    // MasterAcademy must always land on their dedicated page,
                    // never follow a stale returnUrl from a previous role's session.
                    const isMasterAcademy = res?.roles?.includes(ROLES.MasterAcademy);
                    if (this.returnUrl && !isMasterAcademy) {
                      this.router.navigateByUrl(this.returnUrl);
                    } else {
                      this.authenticationService.redirectUser();
                    }
                  }
                }
              }))

            },
            error: (error) => {
              this.loading = false;
              errorCallback(error)
            }
          }));
      }
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }



  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }



  ngAfterViewInit(): void {

  }
}
