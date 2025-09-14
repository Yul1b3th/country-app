import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import type { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase().trim();
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

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

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<Region>(() =>
    validateQueryParam(this.queryParam),
  );

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
        },
      });

      return this.countryService.searchByRegion(params.region);
    },
  });
}
