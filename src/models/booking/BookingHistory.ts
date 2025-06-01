import { Movie } from "../showtime/Movie";
import { Booking } from "./Booking";

export class BookingHistory {
    constructor(
        private historyId : string,
        private bookings : Booking[],
        private movie : Movie,
        private date : Date,
    ){}
    getHostoryid(): string {
        return this.historyId
    }
    getBooking(): Booking[] {
        return this.bookings
    }
    getMovie(): Movie {
        return this.movie
    }
    getDate(): Date {
        return this.date
    }
    addBooking(booking: Booking): void {
        this.bookings.push(booking);
    }
}