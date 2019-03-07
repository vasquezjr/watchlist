import { Injectable } from '@angular/core';
import { Movie } from './movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  formData: Movie;
  constructor() { }
}
