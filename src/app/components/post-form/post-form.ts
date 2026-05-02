import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})
export class PostForm {
  private postService = inject(PostService);
  private router = inject(Router);

  title = signal('');
  author = signal('');
  content = signal('');
  submitted = signal(false);
  error = signal('');

  onSubmit() {
    this.submitted.set(true);
    if (!this.title().trim() || !this.author().trim() || !this.content().trim()) {
      this.error.set('All fields are required.');
      return;
    }
    this.error.set('');
    this.postService.addPost({
      title: this.title().trim(),
      author: this.author().trim(),
      content: this.content().trim(),
    });
    this.router.navigate(['/']);
  }
}
