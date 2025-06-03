import { Movie } from "./Movie";
import { MovieRoom } from "./MovieRoom";
import { Seat } from "../booking/Seat";
import { ZipZone } from "../enum/ZipZone";

export class ShowTime {
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

    getAvailableSeats(): Seat[] {
        return this.movieRoom.getAvailableSeats();
    }

    isSeatAvailable(seat: Seat): boolean {
        return this.getAvailableSeats().some(s => s.getSeatId() === seat.getSeatId());
    }

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

    getMovie(): Movie {
        return this.movie;
    }

    getMovieRoom(): MovieRoom {
        return this.movieRoom;
    }

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

    getShowtimeId(): string {
        return this.showtimeId;
    }

    isShowtimeActive(): boolean {
        const now = new Date();
        const start = new Date(this.startTime);
        const end = new Date(this.endTime);
        return now >= start && now <= end;
    }

    getDuration(): number {
        const start = new Date(this.startTime);
        const end = new Date(this.endTime);
        const durationMs = end.getTime() - start.getTime();
        return Math.round(durationMs / (1000 * 60));
    }

    hasSeatsAvailable(): boolean {
        return this.getAvailableSeats().length > 0;
    }

    getStartTime(): string {
        return this.startTime;
    }

    getEndTime(): string {
        return this.endTime;
    }
}