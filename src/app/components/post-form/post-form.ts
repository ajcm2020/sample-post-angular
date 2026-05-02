import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { PostStatus } from '../../models/post.model';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})
export class PostForm {
  private postService = inject(PostService);
  private authService = inject(AuthService);
  private router = inject(Router);

  title = signal('');
  content = signal('');
  status = signal<PostStatus>('published');
  submitted = signal(false);
  error = signal('');

  currentUser = this.authService.currentUser;

  onSubmit() {
    this.submitted.set(true);
    const authorId = this.currentUser()?.id;
    if (!this.title().trim() || !this.content().trim() || !authorId) {
      this.error.set('All fields are required.');
      return;
    }
    this.error.set('');
    this.postService.addPost({
      title: this.title().trim(),
      authorId,
      content: this.content().trim(),
      status: this.status(),
      publishedAt: this.status() === 'published' ? new Date() : null,
    });
    this.router.navigate(['/']);
  }
}
