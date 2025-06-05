import { Component, inject, OnInit } from '@angular/core';
import { ThemePickerService } from '../shared/header/theme-picker/theme-picker.service';
import { LogoComponent } from '../shared/header/logo/logo.component';
import { CtaComponent } from './cta/cta.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-landing',
  imports: [LogoComponent, CtaComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  themePickerService = inject(ThemePickerService);
  exposedTheme = this.themePickerService.exposedTheme;
}
