import { Component, input } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export default class ByCountryPageComponent {
  countries = input.required<Country[]>();
}
