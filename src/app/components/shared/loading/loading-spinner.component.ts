// components/loading-spinner.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../../../util/animations';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-loading-spinner',
  template: `
    <div class="spinner-overlay main-loading" @fadeInOut>
      <div class="spinner"></div>
    </div>
  `,
  animations: [fadeInOut],
  styles: [
    `
      .main-loading {
        height: 100vh;
      }
    `,
  ],
})
export class LoadingSpinnerComponent {}
