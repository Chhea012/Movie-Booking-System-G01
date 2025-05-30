import { BookingHistory } from "./BookingHistory";
import { Cancellation } from "./Cancellation";
import { Payment } from "./Payment";

export class Booking {
    constructor(
        private id : string,
        private userId : string,
        private showtimeId : string,
        private seats : string[],
        private tickets :  Ticket[] = [],
        private payment : Payment,
        private BookingHistory : BookingHistory,
        private cancellation? : Cancellation,

    )
}