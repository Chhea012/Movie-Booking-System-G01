import { Movie } from "./Movie";

export class MovieManager {

    constructor(private movies: Movie[] = []){}

    addMovie(movie: Movie): void {
        this.movies.push(movie);
    }
    filterMoviesByGenre(genre: string): Movie[] {
        return this.movies.filter(movie => movie.matchesGenre(genre));
    }
}