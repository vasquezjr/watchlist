import { Component, OnInit } from '@angular/core';
import { MovieList } from '../shared/movie-list.model';
import { ActivatedRoute } from '@angular/router';
import { MovieListService } from '../shared/movie-list.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  selectedMovieList: MovieList;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: MovieListService) { }

  ngOnInit() {
    this.getSelectedMovieList();
  }

  getSelectedMovieList(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getMovieList(id).subscribe(
      result => this.selectedMovieList = result as MovieList
    );
    // this.selectedMovieList = this.service.movieListSelected;
  }

  goBack(): void {
    this.location.back();
  }

}
