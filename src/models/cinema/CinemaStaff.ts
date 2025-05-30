import { Person } from "../user/Person";

export class  CinemaStaff extends Person{
    constructor(
        private idCinemaStaff: number,
        name: string,
        email: string,
        phone: string,
    ){
        super(name, email, phone);
    }
}