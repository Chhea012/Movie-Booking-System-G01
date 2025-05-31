import { Seat } from "../booking/Seat";
import { Cinema } from "../cinema/Cinema";
import { ShowTime } from "./ShowTime";
import { SeatStatus } from "../enum/SeatStatus";

export class MovieRoom {
    constructor(
        private id :string,
        private name : string,
        private cinema : Cinema,
        private seats: Seat[] = [],
        private showtime : ShowTime [] = []
    ){}
    //create method addseat
    addSeat(seat: Seat): void {
        this.seats.push(seat);
        seat.setMovieRoom(this); // Set bidirectional relationship
    }
    //create method removedseat
    removeSeat(seatId: string): void {
        this.seats = this.seats.filter(seat => seat.getSeatId() !== seatId); // Assumes getSeatId() exists
    }
    //create method getseat
    getSeats(): Seat[] {
        return [...this.seats];
    }
    //create method getavailableseats
    getAvailableSeats(): Seat[] {
        return this.seats.filter(seat => seat.getStatus() === SeatStatus.AVAILABLE); // Assumes getStatus() exists
    }
    //create method updatedetails
    updateDetails(roomId: string, name: string): void {
        this.id = roomId;
        this.name = name;
    }
    //create method getcinema
    getCinema(): Cinema {
        return this.cinema;
    }
    //create method viewseatavailability
    viewSeatAvailability(): Seat[] {
        return this.getAvailableSeats();
    }
}