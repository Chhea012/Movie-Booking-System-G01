import { Movie } from "./Movie";

export class MovieManager {
    constructor(private movies: Movie[] = []) {}

    addMovie(movie: Movie): void {
        if (!movie) {
            throw new Error("Movie is required");
        }
        this.movies.push(movie);
    }

    filterMoviesByGenre(genre: string): Movie[] {
        if (!genre) {
            throw new Error("Genre is required");
        }
        return this.movies.filter(movie => movie.matchesGenre(genre));
    }

    getMovies(): Movie[] {
        return [...this.movies];
    }
}