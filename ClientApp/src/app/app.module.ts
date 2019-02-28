import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MovieListsComponent } from './movie-lists/movie-lists.component';
import { MovieListComponent } from './movie-lists/movie-list/movie-list.component';
import { MovieComponent } from './movie-lists/movie/movie.component';

//Services
import { MovieListEntryService } from './movie-lists/shared/movie-list-entry.service';
import { MovieService } from './movie-lists/shared/movie.service';
import { MovieListService } from './movie-lists/shared/movie-list.service';
import { MovieListsService } from './movie-lists/shared/movie-lists.service';


//For Toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MovieListsComponent,
    MovieListComponent,
    MovieComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'movielist/:id', component: MovieListComponent },
    ])
  ],
  //Add Services to Providers to be able to use in other Components
  providers: [MovieListEntryService, MovieListService, MovieService, MovieListsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
