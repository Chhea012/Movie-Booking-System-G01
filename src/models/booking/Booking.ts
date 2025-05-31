import { BookingHistory } from "./BookingHistory";
import { Cancellation } from "./Cancellation";
import { Payment } from "./Payment";
import { Ticket } from "./Ticket";

export class Booking {
    constructor(
        private id : string,
        private userId : string,
        private showtimeId : string,
        private seats : string[],
        private ticket : Ticket[],
        private payment : Payment,
        private BookingHistory : BookingHistory,
        private cancellation? : Cancellation,

    ){}

    // added method getID
    public getId(): string {
        return this.id;
    }
}