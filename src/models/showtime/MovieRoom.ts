import { Seat } from "../booking/Seat";
import { Cinema } from "../cinema/Cinema";
import { ShowTime } from "./ShowTime";

export class MovieRoom {
    constructor(
        private id :string,
        private name : string,
        private cinema : Cinema,
        private seats : Seat,
        private showtime : ShowTime [] = []
    ){}
}