import { MovieList } from "./movie-list.interface";
import { Movie } from "./movie.interface";

export interface MovieListEntry {
    MovieListId: number;
    MovieList: MovieList;
    MovieId: number;
    Movie: Movie;
}
