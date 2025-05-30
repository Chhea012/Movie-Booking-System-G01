import { ShowTime } from "./ShowTime";

export class Movie {
    constructor(
        private idMovie: string,
        private title: string,
        private genre: string,
        private duration: string,
        private releaseDate: string,
        showTime: ShowTime[] = []
    ){}
}