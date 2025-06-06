import { Booking } from "./Booking";
import { Seat } from "./Seat";
export class Ticket {
    private ticketId: string;
    private qrCode: string;
    private issueDate: string;
    private seat: Seat;
    private booking?: Booking;
    /**
     * Constructs a new Ticket object.
     * @param ticketId - Unique identifier for the ticket
     * @param qrCode - QR code string for the ticket (can be used for scanning)
     * @param issueDate - Date when the ticket was issued (in ISO string format)
     * @param seat - The seat assigned to this ticket
     * @param booking - (Optional) The booking that includes this ticket
     */
    constructor(
        ticketId: string,
        qrCode: string,
        issueDate: string,
        seat: Seat,
        booking?: Booking
    ) {
        if (!ticketId || !qrCode || !issueDate || !seat) {
            throw new Error("Ticket ID, QR code, issue date, and seat are required");
        }
        if (isNaN(new Date(issueDate).getTime())) {
            throw new Error("Invalid issue date format");
        }
        this.ticketId = ticketId;
        this.qrCode = qrCode;
        this.issueDate = issueDate;
        this.seat = seat;
        this.booking = booking;
    }

    /**
     * Updates the price of the seat linked to this ticket.
     * @param price - New price for the seat (must be non-negative)
     */
    updatePrice(price: number): void {
        if (price < 0) {
            throw new Error("Price must be non-negative");
        }
        this.seat.updateDetails(
            this.seat.getSeatId(),
            this.seat.getRow(),
            this.seat.getSeatNum(),
            this.seat.getZipZone(),
            price
        );
    }
    /**
     * Returns the seat assigned to this ticket.
     */
    getSeat(): Seat {
        return this.seat;
    }
    /**
     * Returns the booking associated with the ticket, if any.
     */
    getBooking(): Booking | null {
        return this.booking || null;
    }
    /**
     * Updates the issue date of the ticket.
     * @param issueDate - New issue date (must be a valid ISO date string)
     */
    updateIssueDate(issueDate: string): void {
        if (!issueDate || isNaN(new Date(issueDate).getTime())) {
            throw new Error("Invalid issue date");
        }
        this.issueDate = issueDate;
    }
    /**
     * Generates a new QR code string using ticket ID and current timestamp.
     */
    generateQRCode(): string {
        const newQRCode = `QR-${this.ticketId}-${new Date().toISOString()}`;
        this.qrCode = newQRCode;
        return newQRCode;
    }
    /**
     * Returns the ticket's unique identifier.
     */
    getTicketId(): string {
        return this.ticketId;
    }
    /**
     * Returns the QR code of the ticket.
     */
    getQRCode(): string {
        return this.qrCode;
    }
    /**
     * Returns the issue date of the ticket.
     */
    getIssueDate(): string {
        return this.issueDate;
    }
}
