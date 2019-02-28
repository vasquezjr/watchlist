import { Component, OnInit } from '@angular/core';
import { MovieListsService } from './shared/movie-lists.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//For Unsubcribe
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieList } from './shared/movie-list.model';

@Component({
  selector: 'app-movie-lists',
  templateUrl: './movie-lists.component.html',
  styleUrls: ['./movie-lists.component.css']
})
export class MovieListsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  movieLists : MovieList[] = [];
 
  constructor(private service: MovieListsService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshLists();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  refreshLists() {
    this.service.getMovieLists()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(result => {
      this.movieLists = result as MovieList[]
    })
  }

  
  onDelete(id:number)
  {
    this.service.deleteMovieList(id)
    .pipe( takeUntil(this.ngUnsubscribe))
    .subscribe(
      result => {
        this.refreshLists();
        this.toastr.success('Successfully Deleted', 'Movie List Deleted');
        },
      error => {console.log(error)}
    )
  }

  resetForm(form:NgForm) {
    //Resest Form Values of Adding List
    if(form != null)  
      form.resetForm();

    //Reset FormData from Service
    this.service.formData = {
      MovieListId : 0,
      MovieListName: '',
      MovieListEntries: null
    }
    
  }

  onSubmit(form:NgForm) {
    this.service.postMovieList()
    .pipe( takeUntil(this.ngUnsubscribe))
    .subscribe(
      result => {
        //If get result back then success with Toastr and Reset Add List Form
        this.resetForm(form);
        this.toastr.success('Submitted Successfully', 'Movie List Added');

        //Reset MovieLists to Update Added Item
        this.refreshLists();
      },
      error => {console.log(error)}
    );
  }
}
