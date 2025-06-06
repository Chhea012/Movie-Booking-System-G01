import { Movie } from "./Movie";
import { MovieRoom } from "./MovieRoom";
import { Seat } from "../booking/Seat";
import { ZipZone } from "../enum/ZipZone";

/**
 * Represents a scheduled showtime for a movie in a specific movie room.
 * Includes pricing, seat availability, and time validation logic.
 */
export class ShowTime {
    /**
     * Constructs a new ShowTime instance.
     * @param showtimeId - Unique identifier for the showtime.
     * @param startTime - Start time of the showtime (ISO string format).
     * @param endTime - End time of the showtime (ISO string format).
     * @param price - Base price for the showtime (must be non-negative).
     * @param movieRoom - The movie room in which the showtime is held.
     * @param movie - The movie associated with the showtime.
     * Throws an error if the times are invalid or price is negative.
     */
    constructor(
        private showtimeId: string,
        private startTime: string,
        private endTime: string,
        private price: number,
        private movieRoom: MovieRoom,
        private movie: Movie
    ) {
        this.validateTimes(startTime, endTime);
        if (price < 0) {
            throw new Error("Price must be non-negative");
        }
    }

    /**
     * Validates that start time and end time are valid and start is before end.
     * @param startTime - The start time string.
     * @param endTime - The end time string.
     * Throws an error if the times are invalid or logically incorrect.
     */
    private validateTimes(startTime: string, endTime: string): void {
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error("Invalid start or end time: must be a valid date");
        }
        if (start >= end) {
            throw new Error("Start time must be before end time");
        }
    }

    /**
     * Updates the showtime's details.
     * @param showtimeId - New showtime ID.
     * @param startTime - New start time.
     * @param endTime - New end time.
     * @param price - New price.
     * Throws an error if time is invalid or price is negative.
     */
    updateDetails(showtimeId: string, startTime: string, endTime: string, price: number): void {
        this.validateTimes(startTime, endTime);
        if (price < 0) {
            throw new Error("Price must be non-negative");
        }
        this.showtimeId = showtimeId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
    }

    /**
     * Gets all available seats for the showtime.
     * @returns An array of available Seat objects.
     */
    getAvailableSeats(): Seat[] {
        return this.movieRoom.getAvailableSeats();
    }

    /**
     * Checks whether a given seat is available for the showtime.
     * @param seat - The seat to check.
     * @returns True if the seat is available; false otherwise.
     */
    isSeatAvailable(seat: Seat): boolean {
        return this.getAvailableSeats().some(s => s.getSeatId() === seat.getSeatId());
    }

    /**
     * Calculates the price for a specific seat based on its zone.
     * @param seat - The seat to calculate price for.
     * @returns Calculated price for the seat.
     */
    calculatePrice(seat: Seat): number {
        const basePrice = this.price;
        const zipZone = seat.getZipZone();
        switch (zipZone) {
            case ZipZone.VIP:
                return basePrice * 1.5;
            case ZipZone.PREMIUN:
                return basePrice * 1.2;
            case ZipZone.STANDARD:
            default:
                return basePrice;
        }
    }

    /**
     * Retrieves the movie associated with the showtime.
     * @returns The Movie object.
     */
    getMovie(): Movie {
        return this.movie;
    }

    /**
     * Retrieves the movie room where the showtime is scheduled.
     * @returns The MovieRoom object.
     */
    getMovieRoom(): MovieRoom {
        return this.movieRoom;
    }

    /**
     * Filters this showtime by a given time.
     * @param time - The target time to check (ISO string).
     * @returns An array containing this showtime if it matches; otherwise, empty array.
     */
    filterShowtimesByTime(time: string): ShowTime[] {
        const target = new Date(time);
        if (isNaN(target.getTime())) {
            throw new Error("Invalid time: must be a valid date");
        }
        const start = new Date(this.startTime);
        const end = new Date(this.endTime);
        if (target >= start && target <= end) {
            return [this];
        }
        return [];
    }

    /**
     * Retrieves the showtime ID.
     * @returns The showtime ID string.
     */
    getShowtimeId(): string {
        return this.showtimeId;
    }

    /**
     * Checks if the showtime is currently active.
     * @returns True if the current time is between the start and end time.
     */
    isShowtimeActive(): boolean {
        const now = new Date();
        const start = new Date(this.startTime);
        const end = new Date(this.endTime);
        return now >= start && now <= end;
    }

    /**
     * Calculates the duration of the showtime in minutes.
     * @returns The duration in minutes.
     */
    getDuration(): number {
        const start = new Date(this.startTime);
        const end = new Date(this.endTime);
        const durationMs = end.getTime() - start.getTime();
        return Math.round(durationMs / (1000 * 60));
    }

    /**
     * Checks if the showtime has any available seats.
     * @returns True if there are available seats; false otherwise.
     */
    hasSeatsAvailable(): boolean {
        return this.getAvailableSeats().length > 0;
    }

    /**
     * Gets the start time of the showtime.
     * @returns The start time string.
     */
    getStartTime(): string {
        return this.startTime;
    }

    /**
     * Gets the end time of the showtime.
     * @returns The end time string.
     */
    getEndTime(): string {
        return this.endTime;
    }

    /**
     * Gets the base price of the showtime.
     * @returns The price as a number.
     */
    getPrice(): number {
        return this.price;
    }
}
