import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard)
      },
      {
        path: 'products',
        loadComponent: () => import('./product/product').then(c => c.Product)
      },
      {
        path: 'pages',
        loadComponent: () => import('./page/page').then(c => c.Page)
      },
      {
        path: 'settings',
        loadComponent: () => import('./setting/setting').then(c => c.Setting)
      },
    ]
  },
];