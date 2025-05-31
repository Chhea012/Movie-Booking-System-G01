import { Booking } from "./Booking";
import { Seat } from "./Seat";

export class Ticket {
    constructor(
        private ticketId: string,
        private qrCode: string,
        private issueDate: string,
        private seat: Seat,
        private booking?: Booking
    ) {}

    // Update ticket price by updating the seat's price
    updatePrice(price: number): void {
        this.seat.updateDetails(
            this.seat.getSeatId(),
            this.seat.getRow(),
            this.seat.getSeatNum(),
            this.seat.getZipZone(), // Pass ZipZone directly
            price
        );
    }

    // Get seat
    getSeat(): Seat {
        return this.seat;
    }

    // Get booking
    getBooking(): Booking | null {
        return this.booking || null;
    }

    // Update issue date
    updateIssueDate(issueDate: string): void {
        this.issueDate = issueDate;
    }

    // Generate QR code
    generateQRCode(): string {
        return `QR-${this.ticketId}-${new Date().toISOString()}`;
    }
}