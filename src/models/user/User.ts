import { Booking } from "../booking/Booking";
import { Review } from "../review/Review";

export class User {
    constructor(
        private userId : string,
        private username : string,
        private password : string,
        private booking : Booking[],
        private review : Review[],
    ){}
}