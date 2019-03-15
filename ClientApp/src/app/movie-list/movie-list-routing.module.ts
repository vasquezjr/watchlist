import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list.component';

const routes: Routes = [
    //Dont need Slash for Path
    { path: 'movielist/:id', component: MovieListComponent },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class MovieListRoutingModule {

}