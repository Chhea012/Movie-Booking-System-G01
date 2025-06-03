import { BookingStatus } from "../enum/BookingStatus";
import { Promotion } from "../promotion/Promotion";
import { BookingHistory } from "./BookingHistory";
import { Cancellation } from "./Cancellation";
import { Payment } from "./Payment";
import { Seat } from "./Seat";
import { Ticket } from "./Ticket";
import { SeatStatus } from "../enum/SeatStatus";

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
        private bookingHistory: BookingHistory,
        private cancellation?: Cancellation,
        private promotion?: Promotion
    ) {
        if (!id || !userId || !showtimeId || !seats || !bookingHistory) {
            throw new Error("Booking ID, user ID, showtime ID, seats, and booking history are required");
        }
        this.status = BookingStatus.PENDING;
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
        return [...this.seats];
    }

    getTicket(): Ticket[] {
        return [...this.tickets];
    }

    getPayment(): Payment | null {
        return this.payment;
    }

    setPayment(payment: Payment): void {
        if (!payment) {
            throw new Error("Payment is required");
        }
        this.payment = payment;
    }

    getBookingHistory(): BookingHistory {
        return this.bookingHistory;
    }

    getCancellation(): Cancellation | undefined {
        return this.cancellation;
    }

    getPromotion(): Promotion | undefined {
        return this.promotion;
    }

    setStatus(status: string): void {
        const validStatuses = Object.keys(BookingStatus).map(
            key => BookingStatus[key as keyof typeof BookingStatus]
        ) as BookingStatus[];

        if (!validStatuses.includes(status as BookingStatus)) {
            throw new Error("Invalid booking status");
        }
        this.status = status;
        this.bookingHistory.addEntry(`Booking ${this.id} status updated to ${status} on ${new Date()}`);
    }

    getStatus(): string {
        return this.status;
    }

    getDate(): Date {
        return this.date;
    }

    confirmBooking(): void {
        if (this.tickets.length === 0 || !this.payment || this.status !== BookingStatus.PENDING) {
            throw new Error("Cannot confirm booking: No tickets or payment, or invalid status");
        }
        this.status = BookingStatus.CONFIRMED;
        this.date = new Date();
        this.seats.forEach(seat => seat.setStatus(SeatStatus.BOOKED));
        this.bookingHistory.addEntry(`Booking confirmed on ${this.date}`);
    }

    cancelBooking(): void {
        if (this.status !== BookingStatus.CONFIRMED) {
            throw new Error("Cannot cancel booking: Booking is not in CONFIRMED status");
        }
        this.status = BookingStatus.CANCELLED;
        this.date = new Date();
        this.cancellation = new Cancellation(`CANCEL-${this.id}`, this);
        this.cancellation.cancelBooking(this, "User cancellation");
        this.seats.forEach(seat => seat.setStatus(SeatStatus.AVAILABLE));
        if (this.payment) {
            this.payment.refundPayment();
        }
        this.bookingHistory.addEntry(`Booking cancelled on ${this.date}`);
    }

    generateTicket(seat: Seat): Ticket {
        if (!seat) {
            throw new Error("Seat is required to generate a ticket");
        }
        if (!this.seats.some(s => s.getSeatId() === seat.getSeatId())) {
            throw new Error("Seat is not part of this booking");
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
        this.bookingHistory.addEntry(`Ticket ${ticketId} generated for seat ${seat.getSeatId()} on ${this.date}`);
        return ticket;
    }

    removeTicket(ticketId: string): void {
        if (!ticketId) {
            throw new Error("Ticket ID is required to remove a ticket");
        }
        const ticketIndex = this.tickets.findIndex(ticket => ticket.getTicketId() === ticketId);
        if (ticketIndex === -1) {
            throw new Error(`Ticket with ID ${ticketId} not found in this booking`);
        }
        const removedTicket = this.tickets.splice(ticketIndex, 1)[0];
        this.bookingHistory.addEntry(`Ticket ${ticketId} removed from booking on ${new Date()}`);
    }
}   