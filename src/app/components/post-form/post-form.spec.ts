import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal } from '@angular/core';
import { PostForm } from './post-form';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

const mockUser = { id: 1, name: 'Admin', email: 'admin@blog.com', password: 'x', role: 'admin' as const, createdAt: new Date() };

const mockAuth = {
  currentUser: signal(mockUser),
  isAuthenticated: signal(true),
  login: jasmine.createSpy('login'),
  logout: jasmine.createSpy('logout'),
  register: jasmine.createSpy('register'),
};

describe('PostForm', () => {
  let fixture: ComponentFixture<PostForm>;
  let component: PostForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostForm],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuth },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and content fields', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('#title')).toBeTruthy();
    expect(el.querySelector('#content')).toBeTruthy();
  });

  it('should render a status select', () => {
    expect(fixture.nativeElement.querySelector('#status')).toBeTruthy();
  });

  it('should show validation errors when submitting with empty fields', () => {
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    btn.click();
    fixture.detectChanges();
    const errors = fixture.nativeElement.querySelectorAll('.field-error');
    expect(errors.length).toBe(2);
  });

  it('should not show errors before submission', () => {
    const errors = fixture.nativeElement.querySelectorAll('.field-error');
    expect(errors.length).toBe(0);
  });

  it('should call addPost and navigate on valid submission', () => {
    const postService = TestBed.inject(PostService);
    const router = TestBed.inject(Router);
    spyOn(postService, 'addPost').and.callThrough();
    spyOn(router, 'navigate');

    component.title.set('My Title');
    component.content.set('Great content here');
    component.status.set('published');
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    btn.click();

    expect(postService.addPost).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'My Title',
      authorId: 1,
      content: 'Great content here',
      status: 'published',
    }));
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should set publishedAt to null when status is draft', () => {
    const postService = TestBed.inject(PostService);
    spyOn(postService, 'addPost').and.callThrough();

    component.title.set('Draft Title');
    component.content.set('Draft body');
    component.status.set('draft');
    fixture.nativeElement.querySelector('button[type="submit"]').click();

    expect(postService.addPost).toHaveBeenCalledWith(jasmine.objectContaining({
      status: 'draft',
      publishedAt: null,
    }));
  });

  it('should show Submit button label based on status', () => {
    component.status.set('draft');
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn.textContent).toContain('Save Draft');
  });
});
