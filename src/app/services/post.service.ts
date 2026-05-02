import { Injectable, signal, computed } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private _posts = signal<Post[]>([
    {
      id: 1,
      title: 'Getting Started with Angular 21',
      authorId: 2,
      content: 'Angular 21 brings exciting new features including improved signals API, better performance, and streamlined developer experience.',
      status: 'published',
      createdAt: new Date('2026-04-10'),
      publishedAt: new Date('2026-04-10'),
    },
    {
      id: 2,
      title: 'Building Reactive UIs with Signals',
      authorId: 3,
      content: 'Signals provide a fine-grained reactivity model that makes it easy to track state changes without zone.js overhead.',
      status: 'published',
      createdAt: new Date('2026-04-18'),
      publishedAt: new Date('2026-04-18'),
    },
    {
      id: 3,
      title: 'Standalone Components Best Practices',
      authorId: 2,
      content: 'Standalone components simplify the Angular module system, making it easier to build and maintain large applications.',
      status: 'published',
      createdAt: new Date('2026-04-25'),
      publishedAt: new Date('2026-04-25'),
    },
    {
      id: 4,
      title: 'Angular Signals Deep Dive',
      authorId: 3,
      content: 'A thorough look at Angular signals, computed signals, and effects — and how they replace zone-based change detection.',
      status: 'published',
      createdAt: new Date('2026-04-28'),
      publishedAt: new Date('2026-04-28'),
    },
    {
      id: 5,
      title: 'Lazy Loading in Angular 21',
      authorId: 2,
      content: 'Using loadComponent and loadChildren to split your app into smaller bundles and improve initial load time.',
      status: 'published',
      createdAt: new Date('2026-04-30'),
      publishedAt: new Date('2026-04-30'),
    },
    {
      id: 6,
      title: 'Draft: CSS Grid for App Layouts',
      authorId: 1,
      content: 'Work in progress — exploring how CSS Grid can replace Flexbox hacks for complex application shell layouts.',
      status: 'draft',
      createdAt: new Date('2026-05-01'),
      publishedAt: null,
    },
  ]);

  private _nextId = signal(7);

  readonly posts = computed(() => [...this._posts()].reverse());

  addPost(data: Omit<Post, 'id' | 'createdAt'>): Post {
    const post: Post = {
      id: this._nextId(),
      ...data,
      createdAt: new Date(),
    };
    this._posts.update(posts => [...posts, post]);
    this._nextId.update(n => n + 1);
    return post;
  }
}
