import { ZipZone } from "../enum/ZipZone";
import { MovieRoom } from "../showtime/MovieRoom";
import { SeatStatus } from "../enum/SeatStatus";
import { Movie } from "../showtime/Movie";

export class Seat {
    private status: SeatStatus = SeatStatus.AVAILABLE;

    constructor(
        private seatId: string,
        private row: string,
        private seatNum: string,
        private zipZone: ZipZone,
        private price: string,
        private movieRoom?: MovieRoom
    ) {
        if (!seatId || !row || !seatNum || !zipZone || !price) {
            throw new Error("All seat details are required");
        }
        if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
            throw new Error("Price must be a valid non-negative number");
        }
    }

    getMovie(): Movie | null {
        if (!this.movieRoom) return null;
        const showtimes = this.movieRoom.getShowtimes() || [];
        return showtimes.length > 0 ? showtimes[0].getMovie() : null;
    }

    getMovieRoom(): MovieRoom | null {
        return this.movieRoom || null;
    }

    updateDetails(seatId: string, rowNum: string, seatNum: string, zipZone: ZipZone, price: number): void {
        if (!seatId || !rowNum || !seatNum || !zipZone || isNaN(price) || price < 0) {
            throw new Error("All seat details and valid price are required");
        }
        this.seatId = seatId;
        this.row = rowNum;
        this.seatNum = seatNum;
        this.zipZone = zipZone;
        this.price = price.toString();
    }

    getSeatId(): string {
        return this.seatId;
    }

    getStatus(): SeatStatus {
        return this.status;
    }

    setStatus(status: SeatStatus): void {
        // For a string enum, Object.keys gives us the keys (e.g., "AVAILABLE", "BOOKED", "RESERVED")
        const validStatuses = Object.keys(SeatStatus).map(
            key => SeatStatus[key as keyof typeof SeatStatus]
        ) as SeatStatus[];

        if (!validStatuses.includes(status)) {
            throw new Error("Invalid seat status");
        }
        this.status = status;
    }

    setMovieRoom(movieRoom: MovieRoom): void {
        this.movieRoom = movieRoom;
    }

    getRow(): string {
        return this.row;
    }

    getSeatNum(): string {
        return this.seatNum;
    }

    getZipZone(): ZipZone {
        return this.zipZone;
    }

    getPrice(): string {
        return this.price;
    }
}