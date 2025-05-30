import { ShowTime } from "./ShowTime";

export class MovieRoom {
    constructor(
        private id :string,
        private name : string,
        private cinema : string,
        private seats : string,
        private showtime : ShowTime [] = []
    ){}
}