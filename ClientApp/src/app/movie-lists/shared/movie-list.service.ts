import { Injectable } from '@angular/core';
import { MovieList } from './movie-list.model';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {
  formData: MovieList;
  constructor() { }
}
