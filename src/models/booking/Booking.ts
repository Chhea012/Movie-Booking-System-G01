import { BookingStatus } from "../enum/BookingStatus";
import { Promotion } from "../promotion/Promotion";
import { BookingHistory } from "./BookingHistory";
import { Cancellation } from "./Cancellation";
import { Payment } from "./Payment";
import { Seat } from "./Seat";
import { Ticket } from "./Ticket";
import { SeatStatus } from "../enum/SeatStatus";
import { ShowTime } from "../showtime/ShowTime";


export class Booking {
    private status: string;
    private date: Date;
    constructor(
        private id: string,
        private userId: string,
        private showtime: ShowTime,
        private seats: Seat[],
        private tickets: Ticket[],
        private payment: Payment | null,
        private bookingHistory: BookingHistory,
        private cancellation?: Cancellation,
        private promotion?: Promotion
    ) {
        if (!id || !userId || !showtime || !seats || !bookingHistory) {
            throw new Error("Booking ID, user ID, showtime, seats, and booking history are required");
        }
        this.status = BookingStatus.PENDING;
        this.date = new Date();
    }
    /** 
        * Returns the booking ID.
        */
    getId(): string {
        return this.id;
    }

    /** 
     * Returns the user ID associated with the booking.
     */
    getUserId(): string {
        return this.userId;
    }

    /**
     * Returns the showtime associated with the booking.
     */
    getShowtime(): ShowTime {
        return this.showtime;
    }

    /**
     * Returns a copy of the seats in the booking.
     */
    getSeats(): Seat[] {
        return [...this.seats];
    }

    /**
     * Returns a copy of the tickets in the booking.
     */
    getTicket(): Ticket[] {
        return [...this.tickets];
    }

    /**
     * Returns the payment information, if available.
     */
    getPayment(): Payment | null {
        return this.payment;
    }

    /**
     * Sets the payment for the booking.
     * @param payment - The payment object to be set.
     */
    setPayment(payment: Payment): void {
        if (!payment) {
            throw new Error("Payment is required");
        }
        this.payment = payment;
    }

    /**
     * Returns the booking history object.
     */
    getBookingHistory(): BookingHistory {
        return this.bookingHistory;
    }

    /**
     * Returns the cancellation information if the booking was cancelled.
     */
    getCancellation(): Cancellation | undefined {
        return this.cancellation;
    }

    /**
     * Returns the applied promotion if one exists.
     */
    getPromotion(): Promotion | undefined {
        return this.promotion;
    }

    /**
     * Sets the current status of the booking.
     * @param status - The new booking status (must be a valid BookingStatus).
     */
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

    /**
     * Returns the current booking status.
     */
    getStatus(): string {
        return this.status;
    }

    /**
     * Returns the date the booking was created or last modified.
     */
    getDate(): Date {
        return this.date;
    }

    /**
     * Updates the booking's date.
     * @param date - New date to be set for the booking.
     */
    setDate(date: Date): void {
        this.date = date;
    }

    /**
     * Confirms the booking if it has tickets, a payment, and is in PENDING status.
     * Marks seats as booked and updates history.
     */
    confirmBooking(): void {
        if (this.tickets.length === 0 || !this.payment || this.status !== BookingStatus.PENDING) {
            throw new Error("Cannot confirm booking: No tickets or payment, or invalid status");
        }
        this.status = BookingStatus.CONFIRMED;
        this.date = new Date();
        this.seats.forEach(seat => seat.setStatus(SeatStatus.BOOKED));
        this.bookingHistory.addEntry(`Booking confirmed on ${this.date}`);
    }

    /**
     * Cancels a confirmed booking, releases seats, issues refund, and records cancellation.
     */
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

    /**
     * Generates a new ticket for a specific seat in the booking.
     * @param seat - The seat for which to generate a ticket.
     * @returns The generated Ticket object.
     */
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

    /**
     * Removes a ticket from the booking by its ID and logs the removal in booking history.
     * @param ticketId - ID of the ticket to be removed.
     */
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