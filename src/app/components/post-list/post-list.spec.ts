import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PostList } from './post-list';
import { PostService } from '../../services/post.service';

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

  it('should render seed posts', () => {
    const cards = fixture.nativeElement.querySelectorAll('.post-card');
    expect(cards.length).toBe(3);
  });

  it('should show post titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.post-card h2');
    expect(titles[0].textContent).toContain('Standalone Components Best Practices');
  });

  it('should have a link to /new', () => {
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a.btn-new');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/new');
  });

  it('should show empty state when no posts', () => {
    const service = TestBed.inject(PostService);
    // Override the posts signal by spying on computed
    spyOn(service, 'posts' as any).and.returnValue(() => []);
    // Re-create component with empty service
    const emptyFixture = TestBed.createComponent(PostList);
    // Patch directly
    (emptyFixture.componentInstance as any).posts = () => [];
    emptyFixture.detectChanges();
    const empty = emptyFixture.nativeElement.querySelector('.empty-state');
    expect(empty).toBeTruthy();
  });
});
