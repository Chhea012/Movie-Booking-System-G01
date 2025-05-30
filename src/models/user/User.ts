import { Booking } from "../booking/Booking";
import { Review } from "../review/Review";
import { Person } from "./Person";

export class User extends Person {
    constructor(
        name : string,
        email : string,
        phone : string,
        private userId : string,
        private username : string,
        private password : string,
        private booking : Booking[],
        private review : Review[],
    ){
        super(name, email, phone)
    }
}