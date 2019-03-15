import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CommonModule } from '@angular/common';

//Routing Module
import { MovieListsRoutingModule } from './movie-lists-routing.module';

//Shared Module
import { SharedModule } from '../shared/shared.modules';

//Componenets
import { MovieListsComponent } from './movie-lists.component';


@NgModule({
  imports:      [ CommonModule, SharedModule, FormsModule, MovieListsRoutingModule ],
  declarations: [ MovieListsComponent ],
  exports: [ MovieListsComponent ]
})
export class MovieListsModule { }