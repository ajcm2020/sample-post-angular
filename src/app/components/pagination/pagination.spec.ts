import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagination } from './pagination';
import { Component, signal } from '@angular/core';

@Component({
  imports: [Pagination],
  template: `
    <app-pagination
      [totalItems]="total()"
      [pageSize]="size()"
      [currentPage]="page()"
      (pageChange)="onPageChange($event)"
    />`,
})
class TestHost {
  total = signal(9);
  size = signal(5);
  page = signal(1);
  lastPage = 0;
  onPageChange(p: number) { this.lastPage = p; this.page.set(p); }
}

describe('Pagination', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: TestHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should calculate 2 pages for 9 items with pageSize 5', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.page-btn');
    // Prev + 1 + 2 + Next = 4 buttons
    expect(buttons.length).toBe(4);
  });

  it('should disable Prev button on page 1', () => {
    const prev: HTMLButtonElement = fixture.nativeElement.querySelector('.page-btn');
    expect(prev.disabled).toBeTrue();
  });

  it('should disable Next button on last page', () => {
    host.page.set(2);
    fixture.detectChanges();
    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('.page-btn'));
    const next = buttons[buttons.length - 1];
    expect(next.disabled).toBeTrue();
  });

  it('should emit pageChange when page 2 button clicked', () => {
    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('.page-btn'));
    buttons[2].click(); // Prev | 1 | [2] | Next
    expect(host.lastPage).toBe(2);
  });

  it('should mark current page button as active', () => {
    const active = fixture.nativeElement.querySelector('.page-btn.active');
    expect(active.textContent.trim()).toBe('1');
  });

  it('should not render pagination when totalItems <= pageSize', () => {
    host.total.set(3);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.pagination')).toBeFalsy();
  });
});
