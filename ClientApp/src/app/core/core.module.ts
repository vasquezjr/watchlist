import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from './data.service';
import { SorterService } from './sorter.service';

import { MovieListService } from './movie-list.service';
import { MovieService } from './movie.service';
import { MovieListsService } from './movie-lists.service';
import { MovieSearchService } from './movie-search.service';

@NgModule({
    imports: [ HttpClientModule ],
     //At Runtime Make them Available for Whoever Needs Them
      //Add Services to Providers to be able to use in other Components
    providers: [ MovieListService, MovieService, MovieListsService, MovieSearchService, DataService, SorterService ],
})
export class CoreModule { }