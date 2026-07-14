import { Routes } from '@angular/router';

export const PagesRoutes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
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
  // Coming Soon Pages
  {
    path: 'instructors',
    loadComponent: () => import('./coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent),
  },
  {
    path: 'students',
    loadComponent: () => import('./coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent),
  },
  {
    path: 'reports',
    loadComponent: () => import('./coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('./coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent),
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];
