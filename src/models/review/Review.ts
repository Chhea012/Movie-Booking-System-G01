import { User } from "../user/User";

export class Review {
    
    constructor(
    private  reviewId : number,
    private showTime : string,
    private rating : string,
    private comment : string,
    private user : User
    ){}
}