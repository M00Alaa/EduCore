import { Routes } from '@angular/router';
import { Page404Component } from './extrapages/page404/page404.component';
import { VerticalComponent } from './layouts/vertical/vertical.component';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full',
    },
    {
        path: '',
        loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule),
    },
    {
        path: '',
        component: VerticalComponent,
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
        canActivate: [authGuard],
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(
            (m) => {
                return m.AccountModule;
            },
            (err) => {
                console.error('Failed to load AccountModule:', err); // Debug
                throw err;
            }
        ),
    },
    {
        path: 'loader',
        loadComponent: () => import('./shared/components/spinner/spinner.component').then(m => m.SpinnerComponent)
    },
    {
        path: '**',
        component: Page404Component
    },
];