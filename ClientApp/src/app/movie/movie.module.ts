import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CommonModule } from '@angular/common';

//Shared Module
import { SharedModule } from '../shared/shared.modules';

//Componenets
import { MovieComponent } from './movie.component';


@NgModule({
  imports:      [ CommonModule, SharedModule, FormsModule],
  declarations: [ MovieComponent ],
  exports: [ MovieComponent ]
})
export class MovieModule { }