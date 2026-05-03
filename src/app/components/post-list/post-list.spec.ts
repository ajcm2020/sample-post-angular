import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { computed, signal } from '@angular/core';
import { PostList } from './post-list';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

describe('PostList', () => {
  let fixture: ComponentFixture<PostList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PostList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render up to 5 posts on page 1 (6 seed posts)', () => {
    const cards = fixture.nativeElement.querySelectorAll('.post-card');
    expect(cards.length).toBe(5);
  });

  it('should show pagination when there are more than 5 posts', () => {
    const pagination = fixture.nativeElement.querySelector('app-pagination');
    expect(pagination).toBeTruthy();
  });

  it('should show first post title (newest seed first)', () => {
    const titles = fixture.nativeElement.querySelectorAll('.post-card h2');
    expect(titles[0].textContent).toContain('Draft: CSS Grid for App Layouts');
  });

  it('should have a link to /posts/new', () => {
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a.btn-new');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/posts/new');
  });

  it('should show status badge on each post card', () => {
    const badges = fixture.nativeElement.querySelectorAll('.status-badge');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('should resolve authorId to a name via UserService', () => {
    const userService = TestBed.inject(UserService);
    const name = fixture.componentInstance.getAuthorName(2);
    expect(name).toBe(userService.findById(2)!.name);
  });

  it('should navigate to page 2 when onPageChange is called', () => {
    fixture.componentInstance.onPageChange(2);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.post-card');
    expect(cards.length).toBe(1);
  });

  it('should show empty state when no posts', async () => {
    const emptyPostsSig = computed(() => []);
    const mockPostService = { posts: emptyPostsSig, addPost: jasmine.createSpy() };
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [PostList],
      providers: [
        provideRouter([]),
        { provide: PostService, useValue: mockPostService },
      ],
    }).compileComponents();
    const emptyFixture = TestBed.createComponent(PostList);
    emptyFixture.detectChanges();
    expect(emptyFixture.nativeElement.querySelector('.empty-state')).toBeTruthy();
  });
});
