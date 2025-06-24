import { Component, inject, input, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import type { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export default class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(params.query),
      );
    },
  });
}
