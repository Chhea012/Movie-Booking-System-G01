import { Seat } from "../booking/Seat";
import { Cinema } from "../cinema/Cinema";
import { ShowTime } from "./ShowTime";
import { SeatStatus } from "../enum/SeatStatus";

export class MovieRoom {
    constructor(
        private id: string,
        private name: string,
        private cinema: Cinema,
        private seats: Seat[] = [],
        private showtime: ShowTime[] = []
    ) {}

    // Add a seat to the room
    addSeat(seat: Seat): void {
        this.seats.push(seat);
        seat.setMovieRoom(this); // Set bidirectional relationship
    }

    // Remove a seat by ID
    removeSeat(seatId: string): void {
        this.seats = this.seats.filter(seat => seat.getSeatId() !== seatId);
    }

    // Get all seats
    getSeats(): Seat[] {
        return [...this.seats];
    }

    // Get available seats
    getAvailableSeats(): Seat[] {
        return this.seats.filter(seat => seat.getStatus() === SeatStatus.AVAILABLE);
    }

    // Update room details
    updateDetails(roomId: string, name: string): void {
        this.id = roomId;
        this.name = name;
    }

    // Get cinema
    getCinema(): Cinema {
        return this.cinema;
    }

    // View seat availability
    viewSeatAvailability(): Seat[] {
        return this.getAvailableSeats();
    }

    // Get showtimes
    getShowtimes(): ShowTime[] {
        return [...this.showtime];
    }
}