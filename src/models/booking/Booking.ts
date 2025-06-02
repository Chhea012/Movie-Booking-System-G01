import { BookinStatus } from "../enum/BookingStatus";
import { ShowTime } from "../showtime/ShowTime";
import { User } from "../user/User";
import { BookingHistory } from "./BookingHistory";
import { Cancellation } from "./Cancellation";
import { Payment } from "./Payment";
import { Seat } from "./Seat";
import { Ticket } from "./Ticket";

export class Booking {
    constructor(
        private id : string,
        private user : User,
        private showtime : ShowTime,
        private seats : Seat[],
        private ticket : Ticket[],
        private payment : Payment,
        private BookingHistory : BookingHistory,
        private cancellation? : Cancellation,
        private status: BookinStatus = BookinStatus.PENDING,

    ){}
}