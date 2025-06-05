import { Component } from '@angular/core';
import { dropdownAnimation } from '../../../../../util/animations';
@Component({
  selector: 'app-dropdown',
  imports: [],
  template: `<div class="dropdown flex-vertical" @dropdownAnimation>
    <ng-content />
  </div> `,
  styles: [
    `
      .dropdown {
        gap: 0.4rem;
        align-items: center;
        position: absolute;
        text-wrap: nowrap;
        top: 150%;
        right: 0;
        background-color: var(--color-contrast);
        padding: 0.75rem;
        border-radius: 0.3rem;
        z-index: 1000;
        box-shadow: 0px 1px 5px var(--shadow);
      }
    `,
  ],
  animations: [dropdownAnimation],
})
export class DropdownComponent {}
