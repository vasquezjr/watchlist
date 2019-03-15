import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovieList } from '../shared/interfaces';

@Injectable()
export class DataService {

    readonly rootURL = environment.baseUrl; 
    
    constructor(private http:HttpClient) { }

    getMovieLists() : Observable<IMovieList[]> {
      return this.http.get<IMovieList[]>(this.rootURL + '/MovieLists')
        .pipe (
          catchError(this.handleError)
        )
    }

    getMovieList (id: number) {
      return this.http.get(this.rootURL + '/MovieLists/' + id);
    }

    private handleError(error: any) {
      console.error('server error:', error);
      if (error.error instanceof Error) {
          const errMessage = error.error.message;
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          // return Observable.throw(err.text() || 'backend server error');
      }
      return Observable.throw(error || 'Node.js server error');
    }

}