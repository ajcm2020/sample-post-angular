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
      background: #1c1d20;
      border-top: 1px solid #35363c;
      font-size: 0.8rem;
      color: #5e6070;
      height: 100%;
    }
  `],
})
export class Footer {}
