import { Route } from '@angular/router';
import { FormDeactivatedGuard } from './is-form-filled.guard';
import { JoinComponent } from './pages/join.component';
import { PageComponent } from './pages/page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form',
  },
  {
    path: 'form',
    loadComponent: () => JoinComponent,
    canDeactivate: [FormDeactivatedGuard],
  },
  {
    path: 'page-1',
    data: {
      title: 'Page 1',
    },
    loadComponent: () => PageComponent,
  },
  {
    path: 'page-2',
    data: {
      title: 'Page 2',
    },
    loadComponent: () => PageComponent,
  },
];
