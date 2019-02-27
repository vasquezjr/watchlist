import { Injectable } from '@angular/core';
import { MovieList } from './movie-list.model';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  movieListSelected : MovieList;
  readonly rootURL = 'https://localhost:44347/api'
  
  constructor(private http: HttpClient) { }

  //Get the Selected MovieList and Populate The Movies
  getMovieList (id) {
    return this.http.get(this.rootURL + '/MovieLists/' + id);
    // .toPromise()
    // .then(result => this.movieListSelected = result as MovieList);
  }
}
