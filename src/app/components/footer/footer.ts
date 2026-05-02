import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `<footer class="footer">© 2026 Sample Post Blog</footer>`,
  styles: [`
    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f5f9;
      border-top: 1px solid #e2e8f0;
      font-size: 0.8rem;
      color: #94a3b8;
      height: 100%;
    }
  `],
})
export class Footer {}
