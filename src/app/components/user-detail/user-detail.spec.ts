import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { UserDetail } from './user-detail';

describe('UserDetail', () => {
  const makeFixture = async (id: string) => {
    await TestBed.configureTestingModule({
      imports: [UserDetail],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { params: of({ id }) } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(UserDetail);
    fixture.detectChanges();
    return fixture;
  };

  afterEach(() => TestBed.resetTestingModule());

  it('should create', async () => {
    const fixture = await makeFixture('1');
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display user name for valid id', async () => {
    const fixture = await makeFixture('2');
    expect(fixture.nativeElement.textContent).toContain('Alice Johnson');
  });

  it('should show not-found for unknown id', async () => {
    const fixture = await makeFixture('999');
    expect(fixture.nativeElement.querySelector('.not-found')).toBeTruthy();
  });

  it('should show posts by the user', async () => {
    const fixture = await makeFixture('2');
    const rows = fixture.nativeElement.querySelectorAll('.post-row');
    expect(rows.length).toBeGreaterThan(0);
  });
});
