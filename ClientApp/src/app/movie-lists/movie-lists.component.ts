import { Component, OnInit } from '@angular/core';
import { MovieListsService } from './shared/movie-lists.service';
import { MovieList } from './shared/movie-list.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie-lists',
  templateUrl: './movie-lists.component.html',
  styleUrls: ['./movie-lists.component.css']
})
export class MovieListsComponent implements OnInit {

 
  constructor(private service: MovieListsService) { }

  ngOnInit() {
    this.service.getMovieLists();
  }

  selectedList(movieList : MovieList) {
    this.service.movieListSelected = movieList;
    this.service.getMovieList(movieList.MovieListId);
  }

  onDelete(id:number)
  {
    this.service.deleteMovieList(id)
    .subscribe(result => {
      this.service.getMovieLists();
    },
      error => {
        console.log(error);
    })
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
    this.service.postMovieList().subscribe(
      result => {
        //If get result back then success and Rest Add List Form
        this.resetForm(form);

        //Reset MovieLists to Update Added Item
        this.service.getMovieLists();
      }
    );
    this.resetForm(form);

  }
}
