import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { PostForm } from './post-form';
import { PostService } from '../../services/post.service';

describe('PostForm', () => {
  let fixture: ComponentFixture<PostForm>;
  let component: PostForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PostForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all form fields', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('#title')).toBeTruthy();
    expect(el.querySelector('#author')).toBeTruthy();
    expect(el.querySelector('#content')).toBeTruthy();
  });

  it('should show validation errors when submitting empty form', () => {
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    btn.click();
    fixture.detectChanges();
    const errors = fixture.nativeElement.querySelectorAll('.field-error');
    expect(errors.length).toBe(3);
  });

  it('should not show errors before submission', () => {
    const errors = fixture.nativeElement.querySelectorAll('.field-error');
    expect(errors.length).toBe(0);
  });

  it('should call addPost and navigate on valid submission', () => {
    const service = TestBed.inject(PostService);
    const router = TestBed.inject(Router);
    spyOn(service, 'addPost').and.callThrough();
    spyOn(router, 'navigate');

    component.title.set('My Title');
    component.author.set('Me');
    component.content.set('Great content here');
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    btn.click();

    expect(service.addPost).toHaveBeenCalledWith({
      title: 'My Title',
      author: 'Me',
      content: 'Great content here',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should trim whitespace-only input as invalid', () => {
    component.title.set('   ');
    component.author.set('   ');
    component.content.set('   ');
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    btn.click();
    fixture.detectChanges();
    const errorBanner = fixture.nativeElement.querySelector('.alert-error');
    expect(errorBanner).toBeTruthy();
  });
});
