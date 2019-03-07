import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Movie } from './movie.interface';
import { tap, map } from 'rxjs/operators';

//Environment Variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  
  movieSearchUrl : string = `https://api.themoviedb.org/3/search/movie?api_key=${environment.movieAPIToken}&language=en-US&query=`
  movieSearchUrlPart2: string = "&page=1&include_adult=false"

  movieTrailerSearch: string = "";

  constructor(private http: HttpClient) { }

  searchMovies(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get(this.movieSearchUrl + term + this.movieSearchUrlPart2).pipe(
      map(res => res["results"].slice(0,5))
    );
  }

  searchMovieTrailer(movieId: number) {
    return this.http.get(this.generateMovieTrailerString(movieId));
  }

  generateMovieTrailerString(movieId : number, ): string {
    return `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${environment.movieAPIToken}&language=en-US`
  }

}
