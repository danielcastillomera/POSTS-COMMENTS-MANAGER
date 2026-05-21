import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/posts/pages/posts-list/posts-list.component').then(
        (m) => m.PostsListComponent,
      ),
  },
  {
    path: 'posts/new',
    loadComponent: () =>
      import('./features/posts/pages/post-form/post-form.component').then(
        (m) => m.PostFormComponent,
      ),
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/posts/pages/post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent,
      ),
  },
  {
    path: 'posts/:id/edit',
    loadComponent: () =>
      import('./features/posts/pages/post-form/post-form.component').then(
        (m) => m.PostFormComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'posts',
  },
];
