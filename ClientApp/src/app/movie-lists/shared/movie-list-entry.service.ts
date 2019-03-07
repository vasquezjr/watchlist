import { Injectable } from '@angular/core';
import { MovieListEntry } from './movie-list-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieListEntryService {
  formData: MovieListEntry;

  constructor() { }
}
