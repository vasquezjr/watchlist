import { Injectable } from '@angular/core';
import { MovieList } from './movie-list.model';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MovieListsService {
  movieLists: MovieList[];
 
  formData : MovieList = {
    MovieListId : 0,
    MovieListName: '',
    MovieListEntries: null
  }
  
  readonly rootURL = 'https://localhost:44347/api'

  constructor(private http: HttpClient) { }

  //Get the List of MovieList
  getMovieLists () 
  {
    this.http.get(this.rootURL + '/MovieLists')
    .toPromise()
    .then(res => this.movieLists = res as MovieList[]);
  }

  

  //Add New List Item
  postMovieList () {
    return this.http.post(this.rootURL + '/MovieLists/', this.formData);
    // .toPromise()
    // .then(result => this.movieListSelected = result as MovieList);
  }

  deleteMovieList (id:number){
    return this.http.delete(this.rootURL + '/MovieLists/' + id)
  }


}
