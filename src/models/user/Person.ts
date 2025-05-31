import { CinemaStaff } from "../cinema/CinemaStaff";
import { User } from "./User";

export abstract class Person{
    constructor(
        protected name: string,
        protected email: string,
        protected phone: string,
    ){}
    updateDetails(name: string, email: string, phone: string): void {
        if (!name || !email || !phone) {
            throw new Error("Name, email, and phone must be provided");
        }
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
   
}