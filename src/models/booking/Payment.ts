import { Booking } from "./Booking";

export class Payment {
    constructor(
        private paymentId : number,
        private booking : Booking,
        private taxes : number,
        private bookingFee : number,
        private paymentMethod : string,
        private total : number
    ){}
    getPaymentId(): number {
        return this.paymentId;
    }

    getBooking(): Booking {
        return this.booking;
    }

    getTaxes(): number {
        return this.taxes;
    }

    getBookingFee(): number {
        return this.bookingFee;
    }

    getPaymentMethod(): string {
        return this.paymentMethod;
    }

    getTotal(): number {
        return this.total;
    }
}