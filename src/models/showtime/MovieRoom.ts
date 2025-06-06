import { Seat } from "../booking/Seat";
import { Cinema } from "../cinema/Cinema";
import { ShowTime } from "./ShowTime";
import { SeatStatus } from "../enum/SeatStatus";

/**
 * Represents a movie room within a cinema, holding seats and showtimes.
 */
export class MovieRoom {
    private showtimes: ShowTime[] = [];

    /**
     * Constructor to initialize a movie room.
     * @param id - Unique identifier for the movie room.
     * @param name - Name of the movie room.
     * @param cinema - The cinema to which this room belongs.
     * @param seats - Optional array of seats in the room.
     */
    constructor(
        private id: string,
        private name: string,
        private cinema: Cinema,
        private seats: Seat[] = []
    ) {}

    /**
     * Adds a seat to the movie room and sets the seat's room reference.
     * @param seat - The seat to be added.
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
     * Removes a seat from the movie room by seat ID.
     * @param seatId - The ID of the seat to remove.
     * Throws an error if the seat ID is not provided.
     */
    removeSeat(seatId: string): void {
        if (!seatId) {
            throw new Error("Seat ID is required");
        }
        this.seats = this.seats.filter(seat => seat.getSeatId() !== seatId);
    }

    /**
     * Retrieves all seats in the movie room.
     * @returns An array of Seat instances.
     */
    getSeats(): Seat[] {
        return [...this.seats];
    }

    /**
     * Retrieves only available seats in the movie room.
     * @returns An array of available Seat instances.
     */
    getAvailableSeats(): Seat[] {
        return this.seats.filter(seat => seat.getStatus() === SeatStatus.AVAILABLE);
    }

    /**
     * Updates the ID and name of the movie room.
     * @param roomId - New ID for the room.
     * @param name - New name for the room.
     * Throws an error if either parameter is missing.
     */
    updateDetails(roomId: string, name: string): void {
        if (!roomId || !name) {
            throw new Error("Room ID and name are required");
        }
        this.id = roomId;
        this.name = name;
    }

    /**
     * Retrieves the cinema associated with the movie room.
     * @returns The associated Cinema instance.
     */
    getCinema(): Cinema {
        return this.cinema;
    }

    /**
     * Returns the list of available seats in the movie room.
     * @returns An array of available Seat instances.
     */
    viewSeatAvailability(): Seat[] {
        return this.getAvailableSeats();
    }

    /**
     * Retrieves all showtimes scheduled in this movie room.
     * @returns An array of ShowTime instances.
     */
    getShowtimes(): ShowTime[] {
        return [...this.showtimes];
    }

    /**
     * Adds a showtime to the movie room.
     * @param showtime - The ShowTime instance to add.
     * Throws an error if the showtime is not provided.
     */
    addShowtime(showtime: ShowTime): void {
        if (!showtime) {
            throw new Error("Showtime is required");
        }
        this.showtimes.push(showtime);
    }

    /**
     * Gets the unique ID of the movie room.
     * @returns The movie room ID.
     */
    getId(): string {
        return this.id;
    }

    /**
     * Gets the name of the movie room.
     * @returns The movie room name.
     */
    getName(): string {
        return this.name;
    }
}
