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
    ) {}

    // Get the movie associated with the seat's showtime
    getMovie(): Movie | null {
        if (!this.movieRoom) return null;
        const showtimes = this.movieRoom.getShowtimes() || [];
        return showtimes.length > 0 ? showtimes[0].getMovie() : null; // Assumes ShowTime has getMovie()
    }

    // Get the movie room
    getMovieRoom(): MovieRoom | null {
        return this.movieRoom || null;
    }

    // Update seat details
    updateDetails(seatId: string, rowNum: string, seatNum: string, zipZone: ZipZone, price: number): void {
        this.seatId = seatId;
        this.row = rowNum;
        this.seatNum = seatNum;
        this.zipZone = zipZone;
        this.price = price.toString();
    }

    // Get seat ID
    getSeatId(): string {
        return this.seatId;
    }

    // Get seat status
    getStatus(): SeatStatus {
        return this.status;
    }

    // Set movie room
    setMovieRoom(movieRoom: MovieRoom): void {
        this.movieRoom = movieRoom;
    }

    // Get row
    getRow(): string {
        return this.row;
    }

    // Get seat number
    getSeatNum(): string {
        return this.seatNum;
    }

    // Get zip zone
    getZipZone(): ZipZone {
        return this.zipZone;
    }
}