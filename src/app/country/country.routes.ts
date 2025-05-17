import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: ByCapitalPageComponent,
  },
  // {
  //   path: 'country',
  // },
  {
    path: '**',
    // component: 404PageComponent,
    redirectTo: '',
  },
];

export default countryRoutes;
