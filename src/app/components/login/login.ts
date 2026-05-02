import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal('');
  submitted = signal(false);

  onSubmit(): void {
    this.submitted.set(true);
    if (!this.email().trim() || !this.password()) {
      this.error.set('Email and password are required.');
      return;
    }
    const ok = this.authService.login(this.email().trim(), this.password());
    if (ok) {
      this.router.navigate(['/']);
    } else {
      this.error.set('Invalid email or password.');
    }
  }
}
