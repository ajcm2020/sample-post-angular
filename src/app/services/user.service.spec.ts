import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should seed 3 users', () => {
    expect(service.users().length).toBe(3);
  });

  it('should include an admin user', () => {
    const admin = service.users().find(u => u.role === 'admin');
    expect(admin).toBeTruthy();
    expect(admin!.email).toBe('admin@blog.com');
  });

  it('should print admin credentials to console on init', () => {
    spyOn(console, 'log');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    TestBed.inject(UserService);
    expect(console.log).toHaveBeenCalledWith(jasmine.stringContaining('admin@blog.com'));
  });

  it('should find user by email', () => {
    const user = service.findByEmail('alice@blog.com');
    expect(user).toBeTruthy();
    expect(user!.name).toBe('Alice Johnson');
  });

  it('should return undefined for unknown email', () => {
    expect(service.findByEmail('nobody@example.com')).toBeUndefined();
  });

  it('should find user by id', () => {
    const user = service.findById(1);
    expect(user).toBeTruthy();
    expect(user!.role).toBe('admin');
  });

  it('should return undefined for unknown id', () => {
    expect(service.findById(999)).toBeUndefined();
  });

  it('should add a new user and reflect in users signal', () => {
    const newUser = service.addUser({ name: 'Carol', email: 'carol@blog.com', password: 'pw', role: 'user' });
    expect(newUser.id).toBe(4);
    expect(service.users().length).toBe(4);
  });

  it('should auto-increment user ids', () => {
    const a = service.addUser({ name: 'A', email: 'a@test.com', password: 'x', role: 'user' });
    const b = service.addUser({ name: 'B', email: 'b@test.com', password: 'x', role: 'user' });
    expect(b.id).toBe(a.id + 1);
  });
});
