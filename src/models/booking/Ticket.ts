import { Seat } from "./Seat";

export class Ticket{
    constructor(
        private  ticketId: string,
        private qrCode: string,
        private issueDate: string,
        private seat : Seat
        
    ){}
}