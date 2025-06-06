import { Review } from "../review/Review";
import { ShowTime } from "./ShowTime";

export class Movie {
    private showTimes: ShowTime[] = [];

    /**
     * Constructor to initialize a movie.
     * @param idMovie - Unique identifier for the movie.
     * @param title - Title of the movie.
     * @param genre - Genre category of the movie.
     * @param reviews - Optional array of reviews for the movie.
     * @param description - Short description or synopsis of the movie.
     * @param duration - Movie duration (e.g., "2h 15m").
     * @param releaseDate - Release date in string format.
     * Throws an error if any required movie detail is missing.
     */
    constructor(
        private idMovie: string,
        private title: string,
        private genre: string,
        private reviews: Review[] = [],
        private description: string,
        private duration: string,
        private releaseDate: string
    ) {
        if (!idMovie || !title || !genre || !description || !duration || !releaseDate) {
            throw new Error("All movie details are required");
        }
    }

    /**
     * Retrieves the movie's unique ID.
     * @returns The movie ID.
     */
    getId(): string {
        return this.idMovie;
    }

    /**
     * Retrieves the movie title.
     * @returns The movie title.
     */
    getTitle(): string {
        return this.title;
    }

    /**
     * Retrieves the genre of the movie.
     * @returns The genre string.
     */
    getGenre(): string {
        return this.genre;
    }

    /**
     * Retrieves the movie description.
     * @returns Description string.
     */
    getDescription(): string {
        return this.description;
    }

    /**
     * Retrieves the movie duration.
     * @returns Duration string (e.g., "2h 15m").
     */
    getDuration(): string {
        return this.duration;
    }

    /**
     * Retrieves the release date of the movie.
     * @returns Release date string.
     */
    getReleaseDate(): string {
        return this.releaseDate;
    }

    /**
     * Updates movie details.
     * @param idMovie - New movie ID.
     * @param title - New movie title.
     * @param genre - New genre.
     * @param description - New description.
     * @param duration - New duration.
     * @param releaseDate - New release date.
     * Throws error if any parameter is missing.
     */
    updateDetails(
        idMovie: string,
        title: string,
        genre: string,
        description: string,
        duration: string,
        releaseDate: string
    ): void {
        if (!idMovie || !title || !genre || !description || !duration || !releaseDate) {
            throw new Error("All movie details are required");
        }
        this.idMovie = idMovie;
        this.title = title;
        this.genre = genre;
        this.description = description;
        this.duration = duration;
        this.releaseDate = releaseDate;
    }

    /**
     * Retrieves all showtimes for this movie.
     * @returns Array of ShowTime objects.
     */
    getShowTimes(): ShowTime[] {
        return [...this.showTimes];
    }

    /**
     * Adds a new showtime for the movie.
     * @param showtime - ShowTime object to add.
     * Throws error if showtime is missing.
     */
    addShowTime(showtime: ShowTime): void {
        if (!showtime) {
            throw new Error("Showtime is required");
        }
        this.showTimes.push(showtime);
    }

    /**
     * Retrieves all reviews of the movie.
     * @returns Array of Review objects.
     */
    getReviews(): Review[] {
        return [...this.reviews];
    }

    /**
     * Adds a new review to the movie.
     * @param review - Review object to add.
     * Throws error if review is missing.
     */
    addReview(review: Review): void {
        if (!review) {
            throw new Error("Review is required");
        }
        this.reviews.push(review);
    }

    /**
     * Calculates the average rating of the movie based on reviews.
     * @returns Average rating as number with one decimal place.
     */
    getAverageRating(): number {
        if (this.reviews.length === 0) return 0;
        const totalRating = this.reviews.reduce(
            (sum, review) => sum + parseFloat(review.getRating()),
            0
        );
        return Number((totalRating / this.reviews.length).toFixed(1));
    }

    /**
     * Filters the movie by genre.
     * @param genre - Genre to filter by.
     * @returns Array containing this movie if genre matches, otherwise empty array.
     * Throws error if genre is missing.
     */
    filterMovieByGenre(genre: string): Movie[] {
        if (!genre) {
            throw new Error("Genre is required");
        }
        return this.matchesGenre(genre) ? [this] : [];
    }

    /**
     * Checks if the movie genre matches a given genre.
     * @param genre - Genre to compare.
     * @returns True if genres match, false otherwise.
     */
    matchesGenre(genre: string): boolean {
        return this.genre.toLowerCase() === genre.toLowerCase();
    }
}
