import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap, takeUntil
 } from 'rxjs/operators';
import { Movie } from '../shared/movie.model';
import { MovieSearchService } from '../shared/movie-search.service';
import { MovieListService } from '../shared/movie-list.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  //@Input() addNewMovie: any;
  @Output() addNewMovie = new EventEmitter();

  searchBoxValue: string;

  //Use $ for Observables
  movies$: Observable<any[]>;
  test: any;

  private searchTerms = new Subject<string>();
  private ngUnsubscribe = new Subject();
  
  defaultMovie: Movie; 
  readonly baseImageUrl = "https://image.tmdb.org/t/p/original"

  constructor(private movieSearchService: MovieSearchService, private serviceMovieList: MovieListService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    if(term.length > 2)
      this.setupSearchTerm(term) 
  }

  //Set Up Search Term
  setupSearchTerm(term: string) {
    this.searchTerms.next(term);
  }

  //Reset Search Term
  clearSearchTerm () {
    this.setupSearchTerm('');
    this.searchBoxValue='';
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  addMovieToDatabase(movie: any) {

    this.setMovieObject(movie);

    //When MovieTrailer Grabbed Now I can Add to Database
    this.getMovieTrailer(movie)
    .subscribe( video => {
      if(video["results"].length > 0){
        this.setYoutubeLink(video["results"][0].key); //grabes youtube id from search
      }
       
      console.log("Add Movie To Database", this.serviceMovieList.movie)
      this.addNewMovie.emit();
      this.clearSearchTerm();
    },
      error => {
        console.log(error)
      }
    )
    
  }

  setMovieObject(movie: any) {
    var mov = this.serviceMovieList.movie;
    mov.MovieApiId = movie.id;
    mov.MovieName = movie.title;
    mov.MovieDescription = movie.overview;
    mov.MovieImage = this.baseImageUrl + movie.poster_path;
  }

  getMovieTrailer(movie: any) {
    return this.movieSearchService.searchMovieTrailer(movie.id)
    .pipe(takeUntil(this.ngUnsubscribe));
  }

  setYoutubeLink(youtubeId: string) {
    this.serviceMovieList.movie.MovieTrailerLink = "https://www.youtube.com/watch?v=" + youtubeId;
  }

}
