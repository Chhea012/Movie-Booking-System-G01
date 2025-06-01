import { Booking } from "./Booking";
export class Cancellation {
    constructor(
        private cancelled : string,
        private booking : Booking,
        private status : string,
        private reason : string,
    ){}
    getCancell() : string{
        return this.cancelled
    }
    getbooking() : Booking{
        return this.booking
    }
    getStatus() : string{
        return this.status
    }
    getReason(): string{
        return this.reason
    }
}