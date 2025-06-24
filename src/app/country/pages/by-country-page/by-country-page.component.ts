import { Component, inject, input, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export default class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByCountry(params.query);
    },
  });

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query),
  //     );
  //   },
  // });
}
