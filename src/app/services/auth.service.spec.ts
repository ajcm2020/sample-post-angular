import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be authenticated initially', () => {
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.currentUser()).toBeNull();
  });

  it('should login with correct credentials', () => {
    const ok = service.login('alice@blog.com', 'alice123');
    expect(ok).toBeTrue();
    expect(service.isAuthenticated()).toBeTrue();
    expect(service.currentUser()?.name).toBe('Alice Johnson');
  });

  it('should reject login with wrong password', () => {
    const ok = service.login('alice@blog.com', 'wrong');
    expect(ok).toBeFalse();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should reject login with unknown email', () => {
    const ok = service.login('nobody@example.com', 'pw');
    expect(ok).toBeFalse();
  });

  it('should logout and clear currentUser', () => {
    service.login('alice@blog.com', 'alice123');
    service.logout();
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.currentUser()).toBeNull();
  });

  it('should register a new user and auto-login', () => {
    service.register('Dave', 'dave@blog.com', 'mypass');
    expect(service.isAuthenticated()).toBeTrue();
    expect(service.currentUser()?.name).toBe('Dave');
  });

  it('currentUser signal should be readonly', () => {
    expect(typeof (service.currentUser as any).set).toBe('undefined');
  });
});
