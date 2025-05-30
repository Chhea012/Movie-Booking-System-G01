import { Person } from "../user/Person";
import { Cinema } from "./Cinema";

export class  CinemaStaff extends Person{
    constructor(
        private idCinemaStaff: number,
        private cinema : Cinema,
        name: string,
        email: string,
        phone: string,
    ){
        super(name, email, phone);
    }
}