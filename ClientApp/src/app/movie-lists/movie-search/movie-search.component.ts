import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Movie } from '../shared/movie.model';
import { MovieSearchService } from '../shared/movie-search.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  //Use $ for Observables
  movies$: Observable<any[]>;
  test: any;
  private searchTerms = new Subject<string>();

  constructor(private movieSearchService: MovieSearchService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
    console.log("INSIDE SEARCHTERM")
  }
 
  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieSearchService.searchMovies(term)),
    );

    
  }

}
