import { Review } from "../review/Review";
import { ShowTime } from "./ShowTime";

export class Movie {
    constructor(
        private idMovie: string,
        private title: string,
        private genre: string,
        private review: Review[] = [],
        private description: string,
        private duration: string,
        private releaseDate: string,
        private showTime: ShowTime[] = []
    ){}
    updateDetails(idMovie: string,title: string,genre: string,description: string,duration: string,releaseDate: string): void {
        this.idMovie = idMovie;
        this.title = title;
        this.genre = genre;
        this.description = description;
        this.duration = duration;
        this.releaseDate = releaseDate;
    }

    getShowTimes(): ShowTime[] {
        return this.showTime;
    }
    addShowTime(showtime: ShowTime): void {
        this.showTime.push(showtime);
    }

    getReviews(): Review[] {    
        return this.review;
    }
    // added method to get movie title
    getTitle(): string {
        return this.title;  
    }
    getAverageRating(): number {
        if (this.review.length === 0) return 0;
        const totalRating = this.review.reduce((sum, review) => sum + parseFloat(review.getRating()), 0);
        return totalRating / this.review.length;
    }   

    addReview(review: Review): void {
        this.review.push(review);
    }

    filterMovieByGenre(genre: string): Movie[] {
        return [this].filter(movie => movie.matchesGenre(genre));
    }
    matchesGenre(genre: string): boolean {
        return this.genre.toLowerCase() === genre.toLowerCase();
    }
}
