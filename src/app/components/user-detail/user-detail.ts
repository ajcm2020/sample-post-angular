import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private postService = inject(PostService);

  private userId = toSignal(
    this.route.params.pipe(map(p => Number(p['id'])))
  );

  user = computed(() => this.userService.findById(this.userId() ?? 0));

  userPosts = computed(() =>
    this.postService.posts().filter(p => p.authorId === this.userId())
  );
}
