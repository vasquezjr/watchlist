import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CommonModule } from '@angular/common';

//Routing Module
import { MovieListRoutingModule } from './movie-list-routing.module';

//Shared Module
import { SharedModule } from '../shared/shared.modules';

//Componenets
import { MovieListComponent } from './movie-list.component';
import { MovieSearchModule } from '../movie-search/movie-search.module';
import { MovieModule } from '../movie/movie.module';


@NgModule({
  imports:      [ CommonModule, SharedModule, FormsModule, MovieListRoutingModule, MovieSearchModule, MovieModule],
  declarations: [ MovieListComponent ],
  exports: [ MovieListComponent ]
})
export class MovieListModule { }