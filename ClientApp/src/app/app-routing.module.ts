import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { MovieListComponent } from './movie-lists/movie-list/movie-list.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/movielists'  },
    { path: '**', pathMatch: 'full', redirectTo: '/movielists' }, //matches anything else
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], 
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}