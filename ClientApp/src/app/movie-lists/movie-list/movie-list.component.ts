import { Component, OnInit } from '@angular/core';
import { MovieList } from '../shared/movie-list.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//Services
import { MovieListService } from '../shared/movie-list.service';
import { MovieListEntryService } from '../shared/movie-list-entry.service';

//For Unsubcribe
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Movie } from '../shared/movie.model';



@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  selectedMovieList: MovieList;
  currentMovie: Movie;
 
  constructor(private route: ActivatedRoute,
              private service: MovieListService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getSelectedMovieList();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getSelectedMovieList(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getMovieList(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      result => this.selectedMovieList = result as MovieList,
      error => {console.log(error)}
    );
  }

  addNewMovie(form:NgForm) {
    console.log("Adding New Movie");
    this.service.postMovie()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(result => {
      this.currentMovie = result as Movie;
      console.log(this.currentMovie.MovieId);
      this.service.formData.MovieId = this.currentMovie.MovieId;
      this.addMoveListEntry(form);
    },
    error => {
      console.log(error);
    }
    );

    
  }

  addMoveListEntry(form:NgForm) {
    this.service.formData.MovieListId = this.selectedMovieList.MovieListId;
    console.log("MovieListId: ", this.service.formData.MovieListId);
    console.log("MovieId: ", this.service.formData.MovieId);
    this.service.postMovieListEntry()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(result => {
      this.getSelectedMovieList();
      this.resetForm(form);
      this.toastr.success('Added Successfully', 'Movie Added to List');
    },
    error => {
      console.log(error);
    })
  }

  onSubmit(form:NgForm){
    this.addNewMovie(form);
  }

  onDelete(movieListId:number, movieId:number)
  {
    this.service.deleteMovieListEntry(movieListId, movieId)
    .pipe( takeUntil(this.ngUnsubscribe))
    .subscribe(
      result => {
        this.getSelectedMovieList();
        this.toastr.success('Successfully Deleted', 'Movie List Deleted');
        },
      error => {console.log(error)}
    )
  }

  resetForm(form:NgForm) {
    if(form != null)
      form.resetForm();
    this.resetMovieListEntry();
  }

  resetMovieListEntry() {
    this.service.formData = {
      MovieListId: 0,
      MovieList: null,
      MovieId: 0,
      Movie: null
    }

    this.service.movie = 
      {
        MovieId: 0,
        MovieApiId: 90,
        MovieName: 'default',
        MovieListEntries: null,
      }
  }
}
