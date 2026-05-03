import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  name = signal('');
  email = signal('');
  password = signal('');
  submitted = signal(false);
  error = signal('');

  onSubmit(): void {
    this.submitted.set(true);
    if (!this.name().trim() || !this.email().trim() || !this.password()) {
      this.error.set('All fields are required.');
      return;
    }
    if (this.userService.findByEmail(this.email().trim())) {
      this.error.set('An account with this email already exists.');
      return;
    }
    this.error.set('');
    this.authService.register(this.name().trim(), this.email().trim(), this.password());
    this.router.navigate(['/dashboard']);
  }
}
