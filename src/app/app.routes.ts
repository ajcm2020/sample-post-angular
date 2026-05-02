import { Routes } from '@angular/router';
import { PostList } from './components/post-list/post-list';
import { PostForm } from './components/post-form/post-form';

export const routes: Routes = [
  { path: '', component: PostList },
  { path: 'new', component: PostForm },
  { path: '**', redirectTo: '' },
];
