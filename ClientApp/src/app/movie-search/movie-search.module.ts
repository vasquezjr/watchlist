import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CommonModule } from '@angular/common';

//Shared Module
import { SharedModule } from '../shared/shared.modules';

//Componenets
import { MovieSearchComponent } from './movie-search.component';


@NgModule({
  imports:      [ CommonModule, SharedModule, FormsModule ],
  declarations: [ MovieSearchComponent ],
  exports: [ MovieSearchComponent ]
})
export class MovieSearchModule { }