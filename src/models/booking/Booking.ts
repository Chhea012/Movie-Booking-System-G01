import { Promotion } from "../promotion/Promotion";
import { BookingHistory } from "./BookingHistory";
import { Cancellation } from "./Cancellation";
import { Payment } from "./Payment";
import { Seat } from "./Seat";
import { Ticket } from "./Ticket";

export class Booking {
    private status: string;
    private date: Date;
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

    ){
        this.status = "PENDING";
        this.date = new Date("2025-06-01T23:00:00+07:00");
    }
    getId(): string {
        return this.id;
    }

    getUserId(): string { 
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
    // Added method to set the booking status
    setStatus(status: string): void {
        this.status = status;
    }
    // Getter for status
    getStatus(): string {
        return this.status;
    }
    getDate(): Date {
        return this.date; // New method for user story 4
    }
}