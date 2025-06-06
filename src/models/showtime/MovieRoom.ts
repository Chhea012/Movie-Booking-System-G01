import { Seat } from "../booking/Seat";
import { Cinema } from "../cinema/Cinema";
import { ShowTime } from "./ShowTime";
import { SeatStatus } from "../enum/SeatStatus";
export class MovieRoom {
    private showtimes: ShowTime[] = [];

    /**
     * Constructor to initialize a MovieRoom instance.
     * @param id - Unique identifier for the room.
     * @param name - Name of the room.
     * @param cinema - Cinema object this room belongs to.
     * @param seats - Optional array of Seat objects in the room.
     */
    constructor(
        private id: string,
        private name: string,
        private cinema: Cinema,
        private seats: Seat[] = []
    ) {}

    /**
     * Adds a seat to the room.
     * @param seat - Seat object to be added.
     * Throws an error if the seat is not provided.
     */
    addSeat(seat: Seat): void {
        if (!seat) {
            throw new Error("Seat is required");
        }
        this.seats.push(seat);
        seat.setMovieRoom(this);
    }

    /**
     * Removes a seat from the room by seat ID.
     * @param seatId - The ID of the seat to remove.
     * Throws an error if seatId is not provided.
     */
    removeSeat(seatId: string): void {
        if (!seatId) {
            throw new Error("Seat ID is required");
        }
        this.seats = this.seats.filter(seat => seat.getSeatId() !== seatId);
    }

    /**
     * Retrieves all seats in the room.
     * @returns A new array containing all Seat objects.
     */
    getSeats(): Seat[] {
        return [...this.seats];
    }

    /**
     * Retrieves only available seats in the room.
     * @returns An array of Seat objects with status 'AVAILABLE'.
     */
    getAvailableSeats(): Seat[] {
        return this.seats.filter(seat => seat.getStatus() === SeatStatus.AVAILABLE);
    }

    /**
     * Updates the room's ID and name.
     * @param roomId - New room ID.
     * @param name - New room name.
     * Throws an error if either value is missing.
     */
    updateDetails(roomId: string, name: string): void {
        if (!roomId || !name) {
            throw new Error("Room ID and name are required");
        }
        this.id = roomId;
        this.name = name;
    }

    /**
     * Retrieves the Cinema object associated with this room.
     * @returns The Cinema object.
     */
    getCinema(): Cinema {
        return this.cinema;
    }

    /**
     * Retrieves a list of available seats in the room.
     * @returns An array of available Seat objects.
     */
    viewSeatAvailability(): Seat[] {
        return this.getAvailableSeats();
    }

    /**
     * Retrieves all showtimes scheduled for this room.
     * @returns A new array of ShowTime objects.
     */
    getShowtimes(): ShowTime[] {
        return [...this.showtimes];
    }

    /**
     * Adds a new showtime to the room.
     * @param showtime - The ShowTime object to add.
     * Throws an error if the showtime is not provided.
     */
    addShowtime(showtime: ShowTime): void {
        if (!showtime) {
            throw new Error("Showtime is required");
        }
        this.showtimes.push(showtime);
    }
}
