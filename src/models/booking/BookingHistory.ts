import { Movie } from "../showtime/Movie";
import { Booking } from "./Booking";

export class BookingHistory {
    constructor(
        private historyId : string,
        private booking : Booking,
        private movie : Movie,
        private date : Date,
    ){}
}