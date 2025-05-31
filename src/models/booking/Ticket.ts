import { Booking } from "./Booking";
import { Seat } from "./Seat";

export class Ticket{
    constructor(
        private  ticketId: string,
        private qrCode: string,
        private issueDate: string,
        private seat : Seat,
        private booking?: Booking
        
    ){}
    //create method updatePrice
    updatePrice(price: number): void {
        this.seat.updateDetails(
            this.seat.getSeatId(),
            this.seat.getRow(), // Assumes Seat has getRow()
            this.seat.getSeatNum(), // Assumes Seat has getSeatNum()
            this.seat.getZipZone().toString(), // Assumes Seat has getZipZone()
            price
        );
    }
    //create method getSeat
    getSeat(): Seat {
        return this.seat;
    }
    //create method getBooking
    getBooking(): Booking | null {
        return this.booking || null;
    } 
    //create method updateIssueDate
    updateIssueDate(issueDate: string): void {
        this.issueDate = issueDate;
    }
    //create method generateQRCode
    generateQRCode(): string {
        return `QR-${this.ticketId}-${new Date().toISOString()}`;
    }
}