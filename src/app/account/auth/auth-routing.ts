import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
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
      }
    ]
  }
];

