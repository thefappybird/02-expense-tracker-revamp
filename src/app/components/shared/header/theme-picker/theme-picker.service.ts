import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemePickerService {
  private theme = signal('');
  private document = inject(DOCUMENT);
  private localStorage = this.document.defaultView?.localStorage;

  exposedTheme = this.theme.asReadonly();

  public loadInitialTheme(): void {
    if (this.localStorage) {
      const savedPreference = this.localStorage.getItem('theme');
      const initialPreference =
        savedPreference === 'dark' || savedPreference === 'light'
          ? savedPreference
          : this.getSystemThemePreference()
          ? 'dark'
          : 'light';

      this.applyTheme(initialPreference);
    }
  }
  private getSystemThemePreference(): boolean {
    // Check for browser/OS preference
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  private applyTheme(preference: 'dark' | 'light'): void {
    const htmlElement = this.document.documentElement;
    htmlElement.setAttribute('data-theme', preference);
    this.theme.set(preference);
    if (this.localStorage) {
      this.localStorage.setItem('theme', preference);
    }
  }

  onThemeToggle(): void {
    const preference = this.theme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(preference);
  }
}
