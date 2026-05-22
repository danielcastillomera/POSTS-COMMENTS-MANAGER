import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/posts/pages/posts-list/posts-list.component').then((m) => m.PostsListComponent),
  },
  {
    path: 'posts/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/posts/pages/post-form/post-form.component').then((m) => m.PostFormComponent),
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/posts/pages/post-detail/post-detail.component').then((m) => m.PostDetailComponent),
  },
  {
    path: 'posts/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/posts/pages/post-form/post-form.component').then((m) => m.PostFormComponent),
  },
  { path: '**', redirectTo: 'posts' },
];
