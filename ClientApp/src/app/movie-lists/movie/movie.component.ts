import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovieListEntry } from '../shared/movie-list-entry.interface';
import { Movie } from '../shared/movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() ml: MovieListEntry;
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteMovie(movie: Movie) {
    this.onDelete.emit(movie);
  }
}
