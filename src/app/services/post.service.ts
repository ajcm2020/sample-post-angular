import { Injectable, signal, computed } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private _posts = signal<Post[]>([
    {
      id: 1,
      title: 'Getting Started with Angular 21',
      author: 'Alice Johnson',
      content: 'Angular 21 brings exciting new features including improved signals API, better performance, and streamlined developer experience.',
      createdAt: new Date('2026-04-10'),
    },
    {
      id: 2,
      title: 'Building Reactive UIs with Signals',
      author: 'Bob Smith',
      content: 'Signals provide a fine-grained reactivity model that makes it easy to track state changes without zone.js overhead.',
      createdAt: new Date('2026-04-18'),
    },
    {
      id: 3,
      title: 'Standalone Components Best Practices',
      author: 'Carol White',
      content: 'Standalone components simplify the Angular module system, making it easier to build and maintain large applications.',
      createdAt: new Date('2026-04-25'),
    },
  ]);

  private _nextId = signal(4);

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
