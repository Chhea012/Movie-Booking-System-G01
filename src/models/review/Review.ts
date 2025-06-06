import { Movie } from "../showtime/Movie";
import { User } from "../user/User";
export class Review {
    private creationDate: string = new Date().toISOString();
    private approved: boolean = false;

    /**
     * Constructor to initialize a review.
     * @param reviewId - Unique identifier for the review.
     * @param showTime - Showtime identifier or description associated with the review.
     * @param rating - Rating given by the user (expected as a stringified number between 0 and 5).
     * @param comment - Text comment provided by the user.
     * @param user - The User who submitted the review.
     * @param movie - The Movie being reviewed.
     * Throws errors if any required field is missing or if rating is invalid.
     */
    constructor(
        private reviewId: number,
        private showTime: string,
        private rating: string,
        private comment: string,
        private user: User,
        private movie: Movie
    ) {
        if (!reviewId || !showTime || !rating || !comment || !user || !movie) {
            throw new Error("All review details are required");
        }
        if (isNaN(parseFloat(rating)) || parseFloat(rating) < 0 || parseFloat(rating) > 5) {
            throw new Error("Rating must be a number between 0 and 5");
        }
    }

    /**
     * Updates the review's rating and comment.
     * @param rating - New rating (stringified number between 0 and 5).
     * @param comment - New comment text.
     * Throws errors if parameters are invalid or missing.
     */
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

    /**
     * Retrieves the User who submitted the review.
     * @returns The User object.
     */
    getUser(): User {
        return this.user;
    }

    /**
     * Retrieves the Movie associated with the review.
     * @returns The Movie object.
     */
    getMovie(): Movie {
        return this.movie;
    }

    /**
     * Retrieves the unique ID of the review.
     * @returns The review ID.
     */
    getReviewId(): number {
        return this.reviewId;
    }

    /**
     * Retrieves the rating given in the review.
     * @returns The rating as a string.
     */
    getRating(): string {
        return this.rating;
    }

    /**
     * Retrieves the comment content of the review.
     * @returns The comment text.
     */
    getComment(): string {
        return this.comment;
    }

    /**
     * Checks if the review has been approved.
     * @returns True if approved, false otherwise.
     */
    isApproved(): boolean {
        return this.approved;
    }

    /**
     * Sets the approval status of the review.
     * @param approved - Boolean indicating the approval status.
     */
    setApprovalStatus(approved: boolean): void {
        this.approved = approved;
    }

    /**
     * Retrieves the creation date and time of the review.
     * @returns The ISO string of the creation date.
     */
    getCreationDate(): string {
        return this.creationDate;
    }
}
