import { Component, inject, OnInit, signal } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ThemePickerService } from './components/shared/header/theme-picker/theme-picker.service';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoadingSpinnerComponent } from './components/shared/loading/loading-spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  themePickerService = inject(ThemePickerService);
  isLoading = signal(false);
  router = inject(Router);
  constructor() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading.set(false);
      }
    });
  }
  ngOnInit() {
    if (!this.themePickerService.exposedTheme()) {
      this.themePickerService.loadInitialTheme();
    }
  }
}
