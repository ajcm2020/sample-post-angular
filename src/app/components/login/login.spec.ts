import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal, computed } from '@angular/core';
import { Login } from './login';
import { AuthService } from '../../services/auth.service';

const mockAuth = (loginResult: boolean) => ({
  isAuthenticated: computed(() => loginResult),
  currentUser: signal(null),
  login: jasmine.createSpy('login').and.returnValue(loginResult),
  logout: jasmine.createSpy('logout'),
  register: jasmine.createSpy('register'),
});

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let component: Login;

  const setup = async (loginResult = true) => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuth(loginResult) },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create', async () => {
    await setup();
    expect(component).toBeTruthy();
  });

  it('should render email and password fields', async () => {
    await setup();
    expect(fixture.nativeElement.querySelector('#email')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#password')).toBeTruthy();
  });

  it('should show error when submitting empty form', async () => {
    await setup();
    fixture.nativeElement.querySelector('button[type="submit"]').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert-error')).toBeTruthy();
  });

  it('should show error on invalid credentials', async () => {
    await setup(false);
    component.email.set('bad@test.com');
    component.password.set('wrong');
    fixture.nativeElement.querySelector('button[type="submit"]').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert-error').textContent).toContain('Invalid');
  });

  it('should navigate to /dashboard on successful login', async () => {
    await setup(true);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.email.set('admin@blog.com');
    component.password.set('anything');
    fixture.nativeElement.querySelector('button[type="submit"]').click();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
