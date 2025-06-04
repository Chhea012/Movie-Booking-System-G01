import { Movie } from "../showtime/Movie";
import { User } from "../user/User";

export class Review {
    private creationDate: string = new Date().toISOString();
    private approved: boolean = false;

    constructor(
        private reviewId: number,
        private showtimeId: string, // Renamed showTime to showtimeId for clarity
        private rating: string,
        private comment: string,
        private user: User,
        private movie: Movie
    ) {
        if (!reviewId || !showtimeId || !rating || !comment || !user || !movie) {
            throw new Error("All review details are required");
        }
        if (isNaN(parseFloat(rating)) || parseFloat(rating) < 0 || parseFloat(rating) > 5) {
            throw new Error("Rating must be a number between 0 and 5");
        }
    }

    updateReview(rating: string, comment: string): void {
        if (!rating || !comment) {
            throw new Error("Rating and comment are required");
        }
        if (isNaN(parseFloat(rating)) || parseFloat(rating) < 0 || parseFloat(rating) > 5) {
            throw new Error("Rating must be a number between 0 and 5");
        }
        this.rating = rating;
        this.comment = comment;
    }

    getUser(): User {
        return this.user;
    }

    getMovie(): Movie {
        return this.movie;
    }

    getReviewId(): number {
        return this.reviewId;
    }

    getRating(): string {
        return this.rating;
    }

    getComment(): string {
        return this.comment;
    }

    getShowtimeId(): string { // Added method to return showtimeId
        return this.showtimeId;
    }

    isApproved(): boolean {
        return this.approved;
    }

    setApprovalStatus(approved: boolean): void {
        this.approved = approved;
    }

    getCreationDate(): string {
        return this.creationDate;
    }
}