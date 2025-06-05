import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
]);

export const dropdownAnimation = trigger('dropdownAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px)' }),
    animate(
      '200ms cubic-bezier(0.4,0,0.2,1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '150ms cubic-bezier(0.4,0,0.2,1)',
      style({ opacity: 0, transform: 'translateY(-10px)' })
    ),
  ]),
]);
