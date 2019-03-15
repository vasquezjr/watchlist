import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


import { environment } from 'src/environments/environment';
import { IMovie, IMovieListEntry } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  readonly rootURL = environment.baseUrl;

  movie: IMovie = {
    MovieId: 0,
    MovieApiId: 0,
    MovieName: 'default',
    MovieDescription: "No Description",
    MovieImage: "",
    MovieTrailerLink: "",
    MovieListEntries: null,
  }
  formData: IMovieListEntry =  {
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

  deleteMovieListEntry(movieListId: number, movieId: number){
     return this.http.delete(this.rootURL + '/MovieListEntries/' + movieListId + '/' + movieId);
  }
}
