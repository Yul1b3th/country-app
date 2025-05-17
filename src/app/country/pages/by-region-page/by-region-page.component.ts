import { Component } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'app-by-region',
  standalone: true,
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {}
