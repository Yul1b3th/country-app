import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  countryService = inject(CountryService);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<string>(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      console.log({ query: params.query });

      if (!params.query) return of([]);

      // debemos actualizar la url del navegador
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: params.query,
          hola: 'mundo',
          saludos: 'yulibeth',
        },
      });

      return this.countryService.searchByCapital(params.query);
    },
  });
}

// countryResource = resource({
//   params: () => ({ query: this.query() }),
//   loader: async ({ params }) => {
//     if (!params.query) return [];

//     return await firstValueFrom(
//       this.countryService.searchByCapital(params.query),
//     );
//   },
// });

// isLoading = signal(false);
// isError = signal<string | null>(null);
// countries = signal<Country[]>([]);

// onSearch(query: string) {
//   if (this.isLoading()) return;

//   this.isLoading.set(true);
//   this.isError.set(null);

//   this.countryService.searchByCapital(query).subscribe({
//     next: (countries) => {
//       this.isLoading.set(false);
//       this.countries.set(countries);
//     },
//     error: (error) => {
//       this.isLoading.set(false);
//       this.isError.set(error);
//       this.countries.set([]);
//     },
//   });
// }
