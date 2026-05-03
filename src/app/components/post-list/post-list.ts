import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink, DatePipe, Pagination],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  readonly PAGE_SIZE = 5;

  private postService = inject(PostService);
  private userService = inject(UserService);

  currentPage = signal(1);

  allPosts = this.postService.posts;

  pagedPosts = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.allPosts().slice(start, start + this.PAGE_SIZE);
  });

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  getAuthorName(authorId: number): string {
    return this.userService.findById(authorId)?.name ?? 'Unknown';
  }
}
