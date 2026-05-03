import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
