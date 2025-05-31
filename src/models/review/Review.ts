import { Movie } from "../showtime/Movie";
import { User } from "../user/User";

export class Review {
    private creationDate: string = new Date().toISOString(); // Automatically set on creation
    private approved: boolean = false; // Default to unapproved
    constructor(
    private  reviewId : number,
    private showTime : string,
    private rating : string,
    private comment : string,
    private user : User,
    private movie : Movie
    ){}
    //create method updateReview
    updateReview(rating: string, comment: string): void {
        this.rating = rating;
        this.comment = comment;
    }
    //create method getUser
    getUser(): User {
        return this.user;
    }
    //create method getMovie
    getMovie(): Movie {
        return this.movie;
    }
    // Additional Methods
    getReviewId(): number {
        return this.reviewId;
    }
    //create method getRating
    getRating(): string {
        return this.rating;
    }
    //create method getComment
    getComment(): string {
        return this.comment;
    }
    //create method isApproved
    isApproved(): boolean {
        return this.approved;
    }
    //create method setApprovalStatus
    setApprovalStatus(approved: boolean): void {
        this.approved = approved;
    }
    //create method getCreationDate
    getCreationDate(): string {
        return this.creationDate;
    }
}