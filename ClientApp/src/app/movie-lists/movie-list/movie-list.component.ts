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


  
  // ***************************** LIFE CYCLES ********************             
  ngOnInit() {
    this.getSelectedMovieList();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(form:NgForm){
    //this.addNewMovie(form);
  }

  // ***************************** Database ********************  
  getSelectedMovieList(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getMovieList(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      result => this.selectedMovieList = result as MovieList,
      error => {console.log(error)}
    );
  }

  //Add New Movie to Databse if Doesnt Exits
  //If Exists It References The One currently in Database 
  addNewMovie() {
    
    console.log("Inside Movie List Componenet: ", this.service.movie);

    //Adding Movie to List
    this.service.postMovie()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(result => 
      {
        this.currentMovie = result as Movie;
        this.addMovieListEntry(); //possible add Form back
      },
        error => {
          console.log(error);
      }
    );
  }

  //Set Up Movie List Entry for adding to Database
  setMovieListEntry() {
    this.service.formData.MovieId = this.currentMovie.MovieId;
    this.service.formData.MovieListId = this.selectedMovieList.MovieListId;
  }

  //Adds New Movie to MovieList 
  addMovieListEntry() { //possibly add form back form:NgForm
    
    this.setMovieListEntry();
    
    this.service.postMovieListEntry()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(result => {
      this.toastr.success('Added Successfully', this.currentMovie.MovieName);
      this.getSelectedMovieList();
      this.resetForm();        
    },
    error => {
      this.toastr.error('Movie Already in List', 'Error Adding Movie')
      console.log(error);
    })
  }

  //Deletes the Entry that References the MovieList and Movie
  //onDelete(movieListId:number, movieId:number, movieName: string)
  onDelete(deleteMovie: Movie)
  {
    this.service.deleteMovieListEntry(this.selectedMovieList.MovieListId, deleteMovie.MovieId)
    .pipe( takeUntil(this.ngUnsubscribe))
    .subscribe(
      result => {
        this.getSelectedMovieList();
        this.toastr.error('Successfully Deleted', deleteMovie.MovieName);
        },
      error => {console.log(error)}
    )
  }

  // ***************************** RESET INFORMATIOM ******************** 
  resetForm() {
    // if(form != null)
    //   form.resetForm();
    this.resetMovieListEntryData();
    this.resetMovieData();
  }

  resetMovieListEntryData() {
    this.service.formData = {
      MovieListId: 0,
      MovieList: null,
      MovieId: 0,
      Movie: null
    }
  }
  resetMovieData() {
    this.service.movie = {
      MovieId: 0,
      MovieApiId: 90,
      MovieName: 'No Movie Name',
      MovieDescription: "No Description",
      MovieImage: "",
      MovieTrailerLink: "",
      MovieListEntries: null,
    }
  }
}
