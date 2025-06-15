import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./components/home/home').then(c=>c.Home)
    },
    {
        path:'home',
        loadComponent:()=>import('./components/home/home').then(c=>c.Home)
    },
    {
        path:'user',
        loadComponent:()=>import('./components/user/user').then(c=>c.UserComponent)
    }
];
