import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly adminPassword = this.generatePassword();

  private _users = signal<User[]>([
    {
      id: 1,
      name: 'Admin',
      email: 'admin@blog.com',
      password: this.adminPassword,
      role: 'admin',
      createdAt: new Date('2026-01-01'),
    },
    {
      id: 2,
      name: 'Alice Johnson',
      email: 'alice@blog.com',
      password: 'alice123',
      role: 'user',
      createdAt: new Date('2026-01-10'),
    },
    {
      id: 3,
      name: 'Bob Smith',
      email: 'bob@blog.com',
      password: 'bob123',
      role: 'user',
      createdAt: new Date('2026-01-15'),
    },
  ]);

  private _nextId = signal(4);

  readonly users = this._users.asReadonly();

  constructor() {
    console.log(`[UserService] Default admin credentials — email: admin@blog.com  password: ${this.adminPassword}`);
  }

  findByEmail(email: string): User | undefined {
    return this._users().find(u => u.email === email);
  }

  findById(id: number): User | undefined {
    return this._users().find(u => u.id === id);
  }

  addUser(data: Omit<User, 'id' | 'createdAt'>): User {
    const user: User = { id: this._nextId(), ...data, createdAt: new Date() };
    this._users.update(users => [...users, user]);
    this._nextId.update(n => n + 1);
    return user;
  }

  private generatePassword(length = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
