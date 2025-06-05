import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  logoType = input('header');
  logoTypeCheck = computed(() => {
    return this.logoType() === 'header';
  });
  logoStyle = computed(() => {
    return this.logoTypeCheck() ? 'responsive-svg' : 'hero-svg';
  });
  logoColor = computed(() => {
    return this.logoTypeCheck() ? 'var(--color-main)' : 'var(--color-contrast)';
  });
}
