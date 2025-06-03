import { Review } from "../review/Review";
import { ShowTime } from "./ShowTime";

export class Movie {
    private showTimes: ShowTime[] = [];

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

    updateDetails(idMovie: string, title: string, genre: string, description: string, duration: string, releaseDate: string): void {
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

    getShowTimes(): ShowTime[] {
        return [...this.showTimes];
    }

    addShowTime(showtime: ShowTime): void {
        if (!showtime) {
            throw new Error("Showtime is required");
        }
        this.showTimes.push(showtime);
    }

    getReviews(): Review[] {
        return [...this.reviews];
    }

    getTitle(): string {
        return this.title;
    }

    getAverageRating(): number {
        if (this.reviews.length === 0) return 0;
        const totalRating = this.reviews.reduce((sum, review) => sum + parseFloat(review.getRating()), 0);
        return Number((totalRating / this.reviews.length).toFixed(1));
    }

    addReview(review: Review): void {
        if (!review) {
            throw new Error("Review is required");
        }
        this.reviews.push(review);
    }

    filterMovieByGenre(genre: string): Movie[] {
        if (!genre) {
            throw new Error("Genre is required");
        }
        return this.matchesGenre(genre) ? [this] : [];
    }

    matchesGenre(genre: string): boolean {
        return this.genre.toLowerCase() === genre.toLowerCase();
    }

    getId(): string {
        return this.idMovie;
    }
}