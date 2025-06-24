import { Component, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region',
  standalone: true,
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {
  countries = signal<Country[]>([]);
}
