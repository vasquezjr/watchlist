import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MovieListsComponent } from './movie-lists/movie-lists.component';

// import { MovieComponent } from './movie-lists/movie/movie.component';
// import { MovieSearchComponent } from './movie-lists/movie-search/movie-search.component';

//For Toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

//Routing Modules
import { MovieListRoutingModule } from './movie-list/movie-list-routing.module';
import { MovieListsRoutingModule } from './movie-lists/movie-lists-routing.module';
import { AppRoutingModule } from './app-routing.module';

//Modules
import { MovieListsModule } from './movie-lists/movie-lists.module';
import { MovieListModule } from './movie-list/movie-list.module';
import { MovieSearchModule } from './movie-search/movie-search.module';
import { MovieModule } from './movie/movie.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    // HomeComponent,
    // MovieComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    MovieSearchModule,
    MovieModule,
    MovieListsModule,
    MovieListModule,
    CoreModule,
    MovieListRoutingModule,
    MovieListsRoutingModule,
    AppRoutingModule,
    // HttpClientModule,
    //  FormsModule,
     BrowserAnimationsModule,
     ToastrModule.forRoot(), // ToastrModule added
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
