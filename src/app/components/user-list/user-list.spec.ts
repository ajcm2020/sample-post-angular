import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserList } from './user-list';
import { UserService } from '../../services/user.service';

describe('UserList', () => {
  let fixture: ComponentFixture<UserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one row per seeded user', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('should display user names and emails', () => {
    const firstRow: HTMLElement = fixture.nativeElement.querySelector('tbody tr');
    expect(firstRow.textContent).toContain('Admin');
    expect(firstRow.textContent).toContain('admin@blog.com');
  });

  it('should show View link for each user', () => {
    const links = fixture.nativeElement.querySelectorAll('a.btn-detail');
    expect(links.length).toBe(3);
  });

  it('should link to /users/:id', () => {
    const userService = TestBed.inject(UserService);
    const firstUser = userService.users()[0];
    const firstLink: HTMLAnchorElement = fixture.nativeElement.querySelector('a.btn-detail');
    expect(firstLink.getAttribute('href')).toBe(`/users/${firstUser.id}`);
  });
});
