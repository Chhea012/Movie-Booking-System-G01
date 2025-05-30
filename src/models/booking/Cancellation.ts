import { Booking } from "./Booking";
export class Cancellation {
    constructor(
        private cancelled : string,
        private booking : Booking,
        private status : string,
        private reason : string,
    ){}
}