import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then(m => m.Register),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/public-shell/public-shell').then(m => m.PublicShell),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/home/home').then(m => m.Home),
      },
      {
        path: 'posts/:id',
        loadComponent: () =>
          import('./components/post-detail/post-detail').then(m => m.PostDetail),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/shell/shell').then(m => m.Shell),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/post-list/post-list').then(m => m.PostList),
      },
      {
        path: 'posts/new',
        loadComponent: () =>
          import('./components/post-form/post-form').then(m => m.PostForm),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./components/user-list/user-list').then(m => m.UserList),
      },
      {
        path: 'users/:id',
        loadComponent: () =>
          import('./components/user-detail/user-detail').then(m => m.UserDetail),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
