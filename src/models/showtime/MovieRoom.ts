import { Seat } from "../booking/Seat";
import { Cinema } from "../cinema/Cinema";
import { ShowTime } from "./ShowTime";
import { SeatStatus } from "../enum/SeatStatus";

export class MovieRoom {
    private showtimes: ShowTime[] = [];

    constructor(
        private id: string,
        private name: string,
        private cinema: Cinema,
        private seats: Seat[] = []
    ) {}

    addSeat(seat: Seat): void {
        if (!seat) {
            throw new Error("Seat is required");
        }
        this.seats.push(seat);
        seat.setMovieRoom(this);
    }

    removeSeat(seatId: string): void {
        if (!seatId) {
            throw new Error("Seat ID is required");
        }
        this.seats = this.seats.filter(seat => seat.getSeatId() !== seatId);
    }

    getSeats(): Seat[] {
        return [...this.seats];
    }

    getAvailableSeats(): Seat[] {
        return this.seats.filter(seat => seat.getStatus() === SeatStatus.AVAILABLE);
    }

    updateDetails(roomId: string, name: string): void {
        if (!roomId || !name) {
            throw new Error("Room ID and name are required");
        }
        this.id = roomId;
        this.name = name;
    }

    getCinema(): Cinema {
        return this.cinema;
    }

    viewSeatAvailability(): Seat[] {
        return this.getAvailableSeats();
    }

    getShowtimes(): ShowTime[] {
        return [...this.showtimes];
    }

    addShowtime(showtime: ShowTime): void {
        if (!showtime) {
            throw new Error("Showtime is required");
        }
        this.showtimes.push(showtime);
    }
}