import { Component } from '@angular/core';

@Component({
  selector: 'app-sections',
  imports: [],
  template: `<div class="flex-container nav-links">
    <ng-content />
  </div>`,
  styles: [
    `
      .nav-links {
        gap: 1rem;
      }
    `,
  ],
})
export class SectionsComponent {}
