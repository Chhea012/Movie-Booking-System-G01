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
}