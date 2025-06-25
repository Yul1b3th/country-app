import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay, of } from 'rxjs';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries),
      ),
      delay(3000),
      catchError((error) => {
        console.error('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener países con esa query ${query}`),
        );
      }),
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries),
      ),
      delay(3000),
      catchError((error) => {
        console.error('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener países con esa query ${query}`),
        );
      }),
    );
  }

  // searchCountryByAlphaCode(code: string): Observable<Country> {
  //   const url = `${API_URL}/alpha/${code}`;

  //   return this.http.get<RESTCountry[]>(url).pipe(
  //     map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
  //     delay(3000),
  //     map((countries) => {
  //       const country = countries.at(0);
  //       if (!country) {
  //         throw new Error(`No se encontró el país con el código ${code}`);
  //       }
  //       return country;
  //     }),
  //   );
  // }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese código ${code}`),
        );
      }),
    );
  }
}
