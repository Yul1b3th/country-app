import { Component, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { RESTCountry } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'app-by-region',
  standalone: true,
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {
  countries = signal<RESTCountry[]>([]);
}
