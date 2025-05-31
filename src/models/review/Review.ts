import { Movie } from "../showtime/Movie";
import { User } from "../user/User";

export class Review {
    
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
}