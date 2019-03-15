import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMovieListEntry, IMovie } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() ml: IMovieListEntry;
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteMovie(movie: IMovie) {
    this.onDelete.emit(movie);
  }
}
