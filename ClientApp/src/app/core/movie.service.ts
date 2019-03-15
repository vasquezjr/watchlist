import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  formData: IMovie;
  constructor() { }

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
