import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';
import { VerificationComponent } from './verification/verification.component';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'require-verify',
        component: VerificationComponent,
      },
      // {
      //   path: 'confirm-email',
      //   component: ConfirmmailComponent,
      // },
      // {
      //   path: 'verify-email',
      //   component: VerifyEmailComponent,
      // },
      {
        path: 'reset-password',
        component: PasswordresetComponent,
      },
      {
        path: 'new-pass',
        component: Recoverpwd2Component,
      },
    ]
  }
];

