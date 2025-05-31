import { ZipZone } from "../enum/ZipZone";
import { MovieRoom } from "../showtime/MovieRoom";
import { SeatStatus } from "../enum/SeatStatus";
import { Movie } from "../showtime/Movie";

export class Seat{
    private status: SeatStatus = SeatStatus.AVAILABLE;
    constructor(
        private seatId: string,
        private row: string,
        private seatNum: string,
        private  zipZone: ZipZone,
        private  price: string,
        private movieRoom? : MovieRoom  
    ){}
    //create method getMovie
    getMovie(): Movie | null {
        if (!this.movieRoom) return null;
        const showtimes = this.movieRoom.getShowtimes?.() || []; // Fallback to empty array if not defined
        return showtimes.length > 0 ? showtimes[0].getMovie() : null; // Assumes ShowTime has getMovie()
    }
    //create method getMovieRoom
    getMovieRoom(): MovieRoom | null {
        return this.movieRoom || null;
    }
    //create method udpateDetails
    updateDetails(seatId: string, rowNum: string, seatNum: string, zipZone: string, price: number): void {
        this.seatId = seatId;
        this.row = rowNum;
        this.seatNum = seatNum;
        this.zipZone = zipZone as ZipZone; // Cast string to ZipZone enum
        this.price = price.toString();
    }
    // create method getSeatId
    getSeatId(): string {
        return this.seatId;
    }
    //create method getSatus
    getStatus(): SeatStatus {
        return this.status;
    }

    // create method setMovieRoom
    setMovieRoom(movieRoom: MovieRoom): void {
        this.movieRoom = movieRoom;
    }
}