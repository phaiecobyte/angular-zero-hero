import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home').then(m => m.Home)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin-layout/admin.routes').then(m => m.adminRoutes)
    }
];
