import { Notifications } from "../notification/Notifications";
import { User } from "../user/User";
import { Movie } from "./Movie";
import { ShowTime } from "./ShowTime";

/**
 * Class responsible for managing movie operations such as adding movies,
 * filtering by genre, and retrieving movies with their showtimes based on criteria.
 */
export class MovieManager {
    /**
     * Initializes the MovieManager with an optional array of movies.
     * @param movies - Optional array of Movie objects to initialize with.
     */
    constructor(private movies: Movie[] = []) {}

    /**
     * Adds a new movie to the manager and notifies all users about the new movie.
     * @param movie - Movie instance to add.
     * Throws an error if the movie is not provided.
     */
    addMovie(movie: Movie): void {
        if (!movie) {
            throw new Error("Movie is required");
        }
        this.movies.push(movie);
        console.log(`Movie "${movie.getTitle()}" added successfully.`);

        const users = User.getAllUsers();
        users.forEach(user => {
            const notification = new Notifications(
                `NOTIF-MOVIE-${movie.getId()}-${user.getUserId()}`,
                "",
                "New Movie Alert",
                new Date(),
                user
            );
            notification.sendNewMovieAlert(user, movie);
        });
    }

    /**
     * Filters the stored movies by a specific genre.
     * @param genre - The genre to filter movies by.
     * @returns Array of movies matching the specified genre.
     * Throws an error if the genre is not provided.
     */
    filterMoviesByGenre(genre: string): Movie[] {
        if (!genre) {
            throw new Error("Genre is required");
        }
        return this.movies.filter(movie => movie.matchesGenre(genre));
    }

    /**
     * Filters movies and their showtimes based on provided criteria.
     * @param criteria - Object containing optional filters:
     *  - genre: Filter by movie genre.
     *  - date: Filter showtimes by a specific date (YYYY-MM-DD).
     *  - cinemaId: Filter showtimes by cinema ID.
     *  - timeRange: Filter showtimes by start and end times.
     * @returns Array of objects each containing a movie and its filtered showtimes.
     */
    filterMoviesAndShowtimes(criteria: {
        genre?: string;
        date?: string;
        cinemaId?: string;
        timeRange?: { start: string; end: string };
    }): { movie: Movie; showtimes: ShowTime[] }[] {
        let filteredMovies = this.movies;
        if (criteria.genre) {
            filteredMovies = this.filterMoviesByGenre(criteria.genre);
        }

        const result: { movie: Movie; showtimes: ShowTime[] }[] = [];
        for (const movie of filteredMovies) {
            let showtimes = movie.getShowTimes();

            // Determine date filter
            let targetDate: string | undefined = criteria.date;
            if (!targetDate && criteria.timeRange) {
                targetDate = new Date(criteria.timeRange.start).toISOString().split('T')[0];
            }
            if (targetDate) {
                showtimes = showtimes.filter(showtime => {
                    const showDate = new Date(showtime.getStartTime()).toISOString().split('T')[0];
                    return showDate === targetDate;
                });
            }

            if (criteria.cinemaId) {
                showtimes = showtimes.filter(showtime =>
                    showtime.getMovieRoom().getCinema().getCinemaId() === criteria.cinemaId
                );
            }

            if (criteria.timeRange) {
                showtimes = showtimes.filter(showtime => {
                    const showStart = new Date(showtime.getStartTime()).getTime();
                    const rangeStart = new Date(criteria.timeRange!.start).getTime();
                    const rangeEnd = new Date(criteria.timeRange!.end).getTime();
                    return showStart >= rangeStart && showStart <= rangeEnd;
                });
            }

            if (showtimes.length > 0) {
                result.push({ movie, showtimes });
            }
        }

        return result;
    }

    /**
     * Returns a copy of the current list of movies.
     * @returns Array of all movies.
     */
    getMovies(): Movie[] {
        return [...this.movies];
    }
}
