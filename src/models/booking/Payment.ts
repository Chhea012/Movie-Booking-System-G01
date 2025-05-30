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
}