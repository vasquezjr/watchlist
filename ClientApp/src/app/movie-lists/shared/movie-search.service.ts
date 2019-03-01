import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Movie } from './movie.model';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {

  movieSearchUrl : string = "https://api.themoviedb.org/3/search/movie?api_key=01295680d58a846b99ffebe8ff6317c2&language=en-US&query="
  movieSearchUrlPart2: string = "&page=1&include_adult=false"

  constructor(private http: HttpClient) { }

  searchMovies(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    //return this.http.get<Movie[]>(`${this.heroesUrl}/?name=${term}`);

    return this.http.get(this.movieSearchUrl + term + this.movieSearchUrlPart2).pipe(
      map(res => res["results"].slice(0,3))
    );
  }
}
