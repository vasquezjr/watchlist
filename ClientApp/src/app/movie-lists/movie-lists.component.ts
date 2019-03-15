import { Component, OnInit } from '@angular/core';
import { MovieListsService } from '../core/movie-lists.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//For Unsubcribe
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IMovieList } from '../shared/interfaces';




@Component({
  selector: 'app-movie-lists',
  templateUrl: './movie-lists.component.html',
  styleUrls: ['./movie-lists.component.css']
})
export class MovieListsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  movieLists : IMovieList[] = [];
 
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
      this.movieLists = result as IMovieList[]
    })
  }

  
  onDelete(id:number)
  {
    this.service.deleteMovieList(id)
    .pipe( takeUntil(this.ngUnsubscribe))
    .subscribe(
      result => {
        this.refreshLists();
        this.toastr.success('Successfully Deleted', `${result["MovieListName"]}`);
        },
      error => {
        console.log(error)
        this.toastr.success('ERROR', `When Trying to Delete`);
      }
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
        this.toastr.success('Successfully Added', `${result["MovieListName"]}`);

        //Reset MovieLists to Update Added Item
        this.refreshLists();
      },
      error => {
        console.log(error)
        this.toastr.error("Duplicate", "Error Adding To List");
      }
    );
  }
}
