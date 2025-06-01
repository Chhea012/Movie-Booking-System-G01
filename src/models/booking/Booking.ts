import { Promotion } from "../promotion/Promotion";
import { BookingHistory } from "./BookingHistory";
import { Cancellation } from "./Cancellation";
import { Payment } from "./Payment";
import { Seat } from "./Seat";
import { Ticket } from "./Ticket";

export class Booking {
    constructor(
        private id : string,
        private userId : string,
        private showtimeId : string,
        private seats : Seat[],
        private tickets : Ticket[],
        private payment : Payment,
        private BookingHistory : BookingHistory,
        private cancellation? : Cancellation,
        private promotion? : Promotion

    ){}
    getId(): string {
        return this.id;
    }

    getUserId(): string { // Renamed to camelCase
        return this.userId;
    }

    getShowtime(): string {
        return this.showtimeId;
    }

    getSeats(): Seat[] {
        return this.seats;
    }

    getTicket(): Ticket[] {
        return this.tickets;
    }

    getPayment(): Payment {
        return this.payment;
    }

    getBookingHistory(): BookingHistory {
        return this.BookingHistory;
    }

    getCancellation(): Cancellation | undefined {
        return this.cancellation;
    }

    getPromotion(): Promotion | undefined {
        return this.promotion;
    }
}