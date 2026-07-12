import { Routes } from '@angular/router';
import { permissionGuard } from '../core/guards/permission.guard';

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
    // canActivate: [permissionGuard],
    // data: { permission: 'dashboard.view' }
  },
  // Courses Module
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then((m) => m.CoursesModule),
    // canActivate: [permissionGuard],
    // data: { permission: 'courses.view' }
  },
  // Equipment Management Module
  {
    path: 'equipment',
    loadChildren: () => import('./equipment/equipment.module').then((m) => m.EquipmentModule),
    // canActivate: [permissionGuard],
    // data: { permission: 'equipment.view' }
  },

  {
    path: '**',
    redirectTo: 'error/404',
  },
];
