import { Component, ViewEncapsulation } from '@angular/core';
import { LogoComponent } from '../shared/header/logo/logo.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [LogoComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent {}
