import { ShowTime } from "../showtime/ShowTime";
import { CinemaStaff } from "./CinemaStaff";

export class Cinema {
    constructor(
        private cinemaId: string,
        private name : string,
        private address : string,
        private staff: CinemaStaff [],
        private showtimes: ShowTime []

    ){}
}