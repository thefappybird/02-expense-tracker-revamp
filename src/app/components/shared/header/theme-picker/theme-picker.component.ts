import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemePickerService } from './theme-picker.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.css',
})
export class ThemePickerComponent {
  themePickerService = inject(ThemePickerService);
  get isDarkTheme(): boolean {
    return this.themePickerService.exposedTheme() === 'dark';
  }
  themeToggle() {
    this.themePickerService.onThemeToggle();
  }
}
