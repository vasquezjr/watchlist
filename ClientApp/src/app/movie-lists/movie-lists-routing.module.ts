import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListsComponent } from './movie-lists.component';

const routes: Routes = [
    //Dont need Slash for Path
    { path: 'movielists', component: MovieListsComponent },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class MovieListsRoutingModule {

}