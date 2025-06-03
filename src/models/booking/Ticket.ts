import { Booking } from "./Booking";
import { Seat } from "./Seat";

export class Ticket {
    constructor(
        private ticketId: string,
        private qrCode: string,
        private issueDate: string,
        private seat: Seat,
        private booking?: Booking
    ) {
        if (!ticketId || !qrCode || !issueDate || !seat) {
            throw new Error("Ticket ID, QR code, issue date, and seat are required");
        }
    }

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

    getSeat(): Seat {
        return this.seat;
    }

    getBooking(): Booking | null {
        return this.booking || null;
    }

    updateIssueDate(issueDate: string): void {
        if (!issueDate || isNaN(new Date(issueDate).getTime())) {
            throw new Error("Invalid issue date");
        }
        this.issueDate = issueDate;
    }

    generateQRCode(): string {
        return `QR-${this.ticketId}-${new Date().toISOString()}`;
    }

    getTicketId(): string {
        return this.ticketId;
    }
}