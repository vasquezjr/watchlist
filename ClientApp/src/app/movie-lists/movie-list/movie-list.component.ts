import { Component, OnInit } from '@angular/core';
import { MovieListsService } from '../shared/movie-lists.service';
import { MovieList } from '../shared/movie-list.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private service: MovieListsService) { }

  ngOnInit() {

  }

}
