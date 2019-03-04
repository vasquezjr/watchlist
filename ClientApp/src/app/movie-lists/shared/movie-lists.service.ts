import { Injectable } from '@angular/core';
import { MovieList } from './movie-list.model';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MovieListsService {
   
  formData : MovieList = {
    MovieListId : 0,
    MovieListName: '',
    MovieListEntries: null
  }
  
  readonly rootURL = environment.baseUrl; 
 

  constructor(private http: HttpClient) { }

  //Get the List of MovieList
  getMovieLists () 
  {
    return this.http.get(this.rootURL + '/MovieLists');
  }

  
  //Add New List Item
  postMovieList () {
    return this.http.post(this.rootURL + '/MovieLists/', this.formData);
  }

  deleteMovieList (id:number){
    return this.http.delete(this.rootURL + '/MovieLists/' + id);
  }


}
