import { Injectable, signal, computed, inject } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userService = inject(UserService);
  private _currentUser = signal<User | null>(null);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  login(email: string, password: string): boolean {
    const user = this.userService.findByEmail(email);
    if (user && user.password === password) {
      this._currentUser.set(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this._currentUser.set(null);
  }

  register(name: string, email: string, password: string): User {
    const user = this.userService.addUser({ name, email, password, role: 'user' });
    this._currentUser.set(user);
    return user;
  }
}
