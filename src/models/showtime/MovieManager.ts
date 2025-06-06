import { Movie } from "./Movie";
export class MovieManager {
    /**
     * Constructor to initialize the MovieManager with an optional array of movies.
     * @param movies - Optional array of Movie objects.
     */
    constructor(private movies: Movie[] = []) {}

    /**
     * Adds a new movie to the movie list.
     * @param movie - A Movie object to be added.
     * Throws an error if movie is not provided.
     */
    addMovie(movie: Movie): void {
        if (!movie) {
            throw new Error("Movie is required");
        }
        this.movies.push(movie);
    }

    /**
     * Filters the movie list by a specific genre.
     * @param genre - The genre to filter movies by.
     * @returns An array of Movie objects matching the provided genre.
     * Throws an error if genre is not provided.
     */
    filterMoviesByGenre(genre: string): Movie[] {
        if (!genre) {
            throw new Error("Genre is required");
        }
        return this.movies.filter(movie => movie.matchesGenre(genre));
    }

    /**
     * Retrieves the full list of movies.
     * @returns A new array containing all Movie objects.
     */
    getMovies(): Movie[] {
        return [...this.movies];
    }
}
