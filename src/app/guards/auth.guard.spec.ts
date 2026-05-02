import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { signal, computed } from '@angular/core';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let router: Router;

  const makeAuth = (authenticated: boolean) => ({
    isAuthenticated: computed(() => authenticated),
    currentUser: signal(null),
    login: jasmine.createSpy(),
    logout: jasmine.createSpy(),
    register: jasmine.createSpy(),
  });

  const runGuard = () => {
    return TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  };

  it('should allow navigation when authenticated', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: makeAuth(true) },
      ],
    });
    router = TestBed.inject(Router);
    expect(runGuard()).toBeTrue();
  });

  it('should redirect to /login when not authenticated', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: makeAuth(false) },
      ],
    });
    router = TestBed.inject(Router);
    const result = runGuard() as UrlTree;
    expect(result).toBeInstanceOf(UrlTree);
    expect(result.toString()).toBe('/login');
  });
});
