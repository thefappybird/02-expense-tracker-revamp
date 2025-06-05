import { Component, HostListener } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { SectionsComponent } from './sections/sections.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

@Component({
  selector: 'app-header',
  imports: [
    LogoComponent,
    RouterLink,
    HamburgerComponent,
    SectionsComponent,
    DropdownComponent,
    ThemePickerComponent,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen = false;
  isDesktop = window.innerWidth >= 768;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth >= 768;
  }
}
