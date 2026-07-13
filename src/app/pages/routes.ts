import { Routes } from '@angular/router';

export const PagesRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  // Dashboard Module
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  // Courses Module
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];
