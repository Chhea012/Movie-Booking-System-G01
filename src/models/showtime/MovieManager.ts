import { Notifications } from "../notification/Notifications";
import { User } from "../user/User";
import { Movie } from "./Movie";
import { ShowTime } from "./ShowTime";

export class MovieManager {
    /**
     * Constructor to initialize the MovieManager with an optional array of movies.
     * @param movies - Optional array of Movie objects.
     */
    constructor(private movies: Movie[] = []) {}

    /**
     * Adds a new movie to the movie list and sends notifications to all registered users.
     * @param movie - A Movie object to be added.
     * @throws Error if movie is not provided.
     */
    addMovie(movie: Movie): void {
        if (!movie) {
            throw new Error("Movie is required");
        }
        this.movies.push(movie);
        // add console log to movie 
        console.log(`Movie "${movie.getTitle()}" added successfully.`);

        //add Send notification to all registered users
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
     * Filters the movie list by a specific genre.
     * @param genre - The genre to filter movies by.
     * @returns An array of Movie objects matching the provided genre.
     * @throws Error if genre is not provided.
     */
    filterMoviesByGenre(genre: string): Movie[] {
        if (!genre) {
            throw new Error("Genre is required");
        }
        return this.movies.filter(movie => movie.matchesGenre(genre));
    }

    /**
     * Filters movies and their associated showtimes based on provided criteria.
     * @param criteria - An object containing optional filtering criteria: genre, date, cinemaId, and timeRange.
     * @param criteria.genre - Optional genre to filter movies by.
     * @param criteria.date - Optional date to filter showtimes by (uses current date if provided).
     * @param criteria.cinemaId - Optional cinema ID to filter showtimes by.
     * @param criteria.timeRange - Optional object with start and end times to filter showtimes by.
     * @returns An array of objects, each containing a movie and its matching showtimes.
     */
    filterMoviesAndShowtimes(criteria: {
        genre?: string;
        date?: string;
        cinemaId?: string;
        timeRange?: { start: string; end: string };
    }): { movie: Movie; showtimes: ShowTime[] }[] {
        // Filter movies by genre if provided
        let filteredMovies = this.movies;
        if (criteria.genre) {
            filteredMovies = this.filterMoviesByGenre(criteria.genre);
        }

        // Collect showtimes for each movie based on criteria
        const result: { movie: Movie; showtimes: ShowTime[] }[] = [];
        for (const movie of filteredMovies) {
            let showtimes = movie.getShowTimes();
            
            // Filter by date if provided
            if (criteria.date) {
                showtimes = showtimes.filter(showtime => {
                    const showDate = new Date(showtime.getStartTime()).toDateString();
                    return showDate === new Date().toDateString();
                });
            }

            // Filter by cinemaId if provided
            if (criteria.cinemaId) {
                showtimes = showtimes.filter(showtime =>
                    showtime.getMovieRoom().getCinema().getCinemaId() === criteria.cinemaId
                );
            }

            // Filter by time range if provided
            if (criteria.timeRange) {
                showtimes = showtimes.filter(showtime => {
                    const showStart = new Date(showtime.getStartTime()).getTime();
                    const rangeStart = new Date(criteria.timeRange!.start).getTime();
                    const rangeEnd = new Date(criteria.timeRange!.end).getTime();
                    return showStart >= rangeStart && showStart <= rangeEnd;
                });
            }

            // Only include movies with matching showtimes
            if (showtimes.length > 0) {
                result.push({ movie, showtimes });
            }
        }

        return result;
    }
    
    /**
     * Retrieves the full list of movies.
     * @returns A new array containing all Movie objects.
     */
    getMovies(): Movie[] {
        return [...this.movies];
    }
}