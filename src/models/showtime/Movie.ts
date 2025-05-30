<<<<<<< HEAD
import { ShowTime } from "./ShowTime";

=======
>>>>>>> 2e0147c027dd2f9aee88411a2d5aefc7764df1b2
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