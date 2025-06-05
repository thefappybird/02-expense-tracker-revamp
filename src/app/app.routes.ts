import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'demo',
    loadComponent: async () => {
      return new Promise((resolve) => setTimeout(resolve, 1000))
        .then(() => import('./components/demo/demo.component'))
        .then((m) => m.DemoComponent);
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
