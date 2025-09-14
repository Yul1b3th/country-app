import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import type { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region',
  standalone: true,
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  countryService = inject(CountryService);

  queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region') ??
    '') as Region;
  selectedRegion = linkedSignal<Region>(() => this.queryParam ?? 'Americas');

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      console.log({ region: params.region });

      if (!params.region) return of([]);

      // debemos actualizar la url del navegador
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region,
          hola: 'mundo',
          saludos: 'yulibeth',
        },
      });

      return this.countryService.searchByRegion(params.region);
    },
  });
}
