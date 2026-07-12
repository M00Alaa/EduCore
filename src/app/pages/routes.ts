import { Routes } from '@angular/router';
import { PermissionGuard } from '../core/guards/permission.guard';

export const PagesRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  //  Dashboard Module
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [PermissionGuard],
    data: { permission: 'dashboard.view' }
  },
  // Equipment Management Module
  {
    path: 'equipment',
    loadChildren: () => import('./equipment/equipment.module').then((m) => m.EquipmentModule),
    canActivate: [PermissionGuard],
    data: { permission: 'equipment.view' }
  },

  {
    path: '**',
    redirectTo: 'error/404',
  },
];
