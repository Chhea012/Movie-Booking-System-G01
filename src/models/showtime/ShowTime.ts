import { Movie } from "./Movie";
import { MovieRoom } from "./MovieRoom";
import { Seat } from "../booking/Seat";
import { ZipZone } from "../enum/ZipZone";
export class ShowTime {
    /**
     * Constructor to create a ShowTime instance.
     * @param showtimeId - Unique identifier for the showtime.
     * @param startTime - Start time of the showtime (ISO string format).
     * @param endTime - End time of the showtime (ISO string format).
     * @param price - Base price for the showtime.
     * @param movieRoom - The MovieRoom object where this showtime is scheduled.
     * @param movie - The Movie object being shown.
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
     * Validates the start and end times for logical and date validity.
     * @param startTime - Start time (string).
     * @param endTime - End time (string).
     * Throws an error if invalid or illogical.
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
     * Updates showtime details.
     * @param showtimeId - New showtime ID.
     * @param startTime - New start time.
     * @param endTime - New end time.
     * @param price - New base price.
     * Throws an error if data is invalid.
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
     * Retrieves all available seats for this showtime.
     * @returns An array of available Seat objects.
     */
    getAvailableSeats(): Seat[] {
        return this.movieRoom.getAvailableSeats();
    }

    /**
     * Checks if a specific seat is available.
     * @param seat - The Seat object to check.
     * @returns True if available, false otherwise.
     */
    isSeatAvailable(seat: Seat): boolean {
        return this.getAvailableSeats().some(s => s.getSeatId() === seat.getSeatId());
    }

    /**
     * Calculates the final price of a seat based on its zone.
     * @param seat - The Seat object.
     * @returns The price adjusted by zone.
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
     * Retrieves the Movie object for this showtime.
     * @returns The Movie object.
     */
    getMovie(): Movie {
        return this.movie;
    }

    /**
     * Retrieves the MovieRoom object for this showtime.
     * @returns The MovieRoom object.
     */
    getMovieRoom(): MovieRoom {
        return this.movieRoom;
    }

    /**
     * Filters this showtime based on a target time.
     * @param time - The target time to check (ISO string format).
     * @returns An array containing this showtime if it occurs at the given time, else empty.
     * Throws an error if time is invalid.
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
     * @returns The showtime's unique ID string.
     */
    getShowtimeId(): string {
        return this.showtimeId;
    }

    /**
     * Determines if the showtime is currently active.
     * @returns True if active now, false otherwise.
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
     * Checks if there are any available seats.
     * @returns True if available seats exist, false otherwise.
     */
    hasSeatsAvailable(): boolean {
        return this.getAvailableSeats().length > 0;
    }

    /**
     * Retrieves the start time of the showtime.
     * @returns Start time as a string.
     */
    getStartTime(): string {
        return this.startTime;
    }

    /**
     * Retrieves the end time of the showtime.
     * @returns End time as a string.
     */
    getEndTime(): string {
        return this.endTime;
    }
}
