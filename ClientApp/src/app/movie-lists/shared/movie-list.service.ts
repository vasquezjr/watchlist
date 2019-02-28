import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


import { MovieListEntry } from './movie-list-entry.model';
import { Movie } from './movie.model';


// import { MovieListEntry } from './movie-list-entry.model';
// import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {
  readonly rootURL = 'https://localhost:44347/api'

  movie: Movie = {
    MovieId: 0,
    MovieApiId: 90,
    MovieName: 'default',
    MovieListEntries: null,
  }
  formData: MovieListEntry =  {
    MovieListId: 0,
    MovieList: null,
    MovieId: 0,
    Movie: null
  }
  
  constructor(private http: HttpClient) { }

  //Get the Selected MovieList and Populate The Movies
  getMovieList (id: number) {
    return this.http.get(this.rootURL + '/MovieLists/' + id);
  }

  postMovie() {
    return this.http.post(this.rootURL + '/Movies', this.movie)
  }

  postMovieListEntry() {
    return this.http.post(this.rootURL + '/MovieListEntries', this.formData)

  }

  deleteMovieListEntry(id: number){
     return this.http.delete(this.rootURL + '/MovieListEntries/' + id);
  }
}
