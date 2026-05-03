import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal, computed } from '@angular/core';
import { Register } from './register';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

const mockAuth = {
  isAuthenticated: computed(() => false),
  currentUser: signal(null),
  login: jasmine.createSpy(),
  logout: jasmine.createSpy(),
  register: jasmine.createSpy('register').and.returnValue({ id: 4, name: 'Dave' }),
};

describe('Register', () => {
  let fixture: ComponentFixture<Register>;
  let component: Register;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuth },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name, email, and password fields', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('#name')).toBeTruthy();
    expect(el.querySelector('#email')).toBeTruthy();
    expect(el.querySelector('#password')).toBeTruthy();
  });

  it('should show 3 validation errors on empty submit', () => {
    fixture.nativeElement.querySelector('button[type="submit"]').click();
    fixture.detectChanges();
    const errors = fixture.nativeElement.querySelectorAll('.field-error');
    expect(errors.length).toBe(3);
  });

  it('should reject duplicate email', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'findByEmail').and.returnValue({
      id: 1, name: 'Admin', email: 'admin@blog.com', password: 'x', role: 'admin', createdAt: new Date()
    });
    component.name.set('Test');
    component.email.set('admin@blog.com');
    component.password.set('pass');
    fixture.nativeElement.querySelector('button[type="submit"]').click();
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.alert-error');
    expect(error.textContent).toContain('already exists');
  });

  it('should call register and navigate on valid form', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'findByEmail').and.returnValue(undefined);

    component.name.set('Dave');
    component.email.set('dave@blog.com');
    component.password.set('mypass');
    fixture.nativeElement.querySelector('button[type="submit"]').click();

    expect(mockAuth.register).toHaveBeenCalledWith('Dave', 'dave@blog.com', 'mypass');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
