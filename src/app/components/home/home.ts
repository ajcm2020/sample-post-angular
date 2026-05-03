import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  imports: [DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private postService = inject(PostService);

  publishedPosts = computed(() =>
    this.postService.posts()
      .filter(p => p.status === 'published')
      .sort((a, b) => {
        const dateA = a.publishedAt?.getTime() ?? a.createdAt.getTime();
        const dateB = b.publishedAt?.getTime() ?? b.createdAt.getTime();
        return dateB - dateA;
      })
  );
}
