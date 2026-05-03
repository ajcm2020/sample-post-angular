import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private userService = inject(UserService);

  private id = toSignal(
    this.route.paramMap.pipe(map(p => Number(p.get('id'))))
  );

  post = computed(() => this.postService.getById(this.id() ?? 0));
  author = computed(() => {
    const p = this.post();
    return p ? this.userService.findById(p.authorId) : undefined;
  });
}
