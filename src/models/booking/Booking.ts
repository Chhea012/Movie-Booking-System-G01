import { BookinStatus } from "../enum/BookingStatus";
import { Promotion } from "../promotion/Promotion";
import { BookingHistory } from "./BookingHistory";
import { Cancellation } from "./Cancellation";
import { Payment } from "./Payment";
import { Seat } from "./Seat";
import { Ticket } from "./Ticket";
import { User } from "../user/User";
import { ShowTime } from "../showtime/ShowTime";

export class Booking {
    private status: string;
    private date: Date;
    constructor(
        private id: string,
        private userId: string,
        private showtimeId: string,
        private seats: Seat[],
        private tickets: Ticket[],
        private payment: Payment | null, 
        private BookingHistory: BookingHistory,
        private cancellation?: Cancellation,
        private promotion?: Promotion
    ) {
        this.status = "PENDING";
        this.date = new Date();
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

    getPayment(): Payment | null {
        return this.payment;
    }

    // Add setPayment method
    setPayment(payment: Payment): void {
        this.payment = payment;
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

    setStatus(status: string): void {
        this.status = status;
    }

    getStatus(): string {
        return this.status;
    }

    getDate(): Date {
        return this.date;
    }
    setDate(date: Date): void {
        this.date = date;
    }

    confirmBooking(): void {
        if (this.tickets.length > 0 && this.payment && this.status === BookinStatus.PENDING) {
            this.status = BookinStatus.CONFIRMED;
            this.date = new Date();
            this.BookingHistory.addEntry(`Booking confirmed on ${this.date}`);
        } else {
            throw new Error("Cannot confirm booking: No tickets or payment, or invalid status.");
        }
    }

    cancelBooking(): void {
        if (this.status === BookinStatus.CONFIRMED) {
            this.status = BookinStatus.CANCELLED;
            this.date = new Date();
            this.cancellation = new Cancellation(`CANCEL-${this.id}`, this);
            this.BookingHistory.addEntry(`Booking cancelled on ${this.date}`);
        } else {
            throw new Error("Cannot cancel booking: Booking is not in CONFIRMED status.");
        }
    }

    generateTicket(seat: Seat): Ticket {
        if (!seat) {
            throw new Error("Seat is required to generate a ticket.");
        }
        if (!this.seats.some(s => s.getSeatId() === seat.getSeatId())) {
            throw new Error("Seat is not part of this booking.");
        }
        const ticketId = `${this.id}-TICKET-${this.tickets.length + 1}`;
        const ticket = new Ticket(
            ticketId,
            `QR-${ticketId}`,
            this.date.toISOString(),
            seat,
            this
        );
        this.tickets.push(ticket);
        this.BookingHistory.addEntry(`Ticket ${ticketId} generated for seat ${seat.getSeatId()} on ${this.date}`);
        return ticket;
    }

    removeTicket(ticketId: string): void {
        if (!ticketId) {
            throw new Error("Ticket ID is required to remove a ticket.");
        }
        const ticketIndex = this.tickets.findIndex(ticket => ticket.generateQRCode().includes(ticketId));
        if (ticketIndex === -1) {
            throw new Error(`Ticket with ID ${ticketId} not found in this booking.`);
        }
        const removedTicket = this.tickets.splice(ticketIndex, 1)[0];
        this.BookingHistory.addEntry(`Ticket ${ticketId} removed from booking on ${new Date()}`);
    }
}