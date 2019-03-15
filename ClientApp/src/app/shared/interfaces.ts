//Interfaces 
//Put in one file because Javascript at Runtime doesnt know about them
//Therefore dont need to have them in there own file

//Dont use const waldo = <Foo> {} when instantiating defeats purpose of Typescript cause
//wont throw errors if a property in the Object is not defined

//Does not need to have refernce to MovieListEntries. Its Optional
export interface IMovie {
    MovieId: number;
    MovieApiId: number;
    MovieName: string;
    MovieDescription: string;
    MovieImage: string;
    MovieTrailerLink: string;
    MovieListEntries?: IMovieListEntry[];
}

//Does not need to have refernce to MovieListEntries. Its Optional
export interface IMovieList {
    MovieListId: number;
    MovieListName: string;
    MovieListEntries?: IMovieListEntry[];
}

//Does not need to have reference to IMovieList or IMovie its optional
export interface IMovieListEntry {
    MovieListId: number;
    MovieList?: IMovieList;
    MovieId: number;
    Movie?: IMovie;
}