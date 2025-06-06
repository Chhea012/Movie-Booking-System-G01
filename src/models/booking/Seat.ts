import { ZipZone } from "../enum/ZipZone";
import { MovieRoom } from "../showtime/MovieRoom";
import { SeatStatus } from "../enum/SeatStatus";
import { Movie } from "../showtime/Movie";

export class Seat {
    private status: SeatStatus = SeatStatus.AVAILABLE;

    /**
     * Constructs a new Seat instance with required seat details. 
     * @param seatId - Unique identifier for the seat
     * @param row - Row number or label where the seat is located
     * @param seatNum - The number of the seat in the row
     * @param zipZone - The zone of the seat (used for pricing or location grouping)
     * @param price - Price of the seat as a string
     * @param movieRoom - (Optional) MovieRoom that this seat belongs to
     */
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

    /**
     * Returns the movie associated with the seat through its movie room's showtimes.
     * @returns Movie object or null if not found.
     */
    getMovie(): Movie | null {
        if (!this.movieRoom) return null;
        const showtimes = this.movieRoom.getShowtimes() || [];
        return showtimes.length > 0 ? showtimes[0].getMovie() : null;
    }

    /**
     * Returns the movie room associated with this seat.
     * @returns MovieRoom object or null.
     */
    getMovieRoom(): MovieRoom | null {
        return this.movieRoom || null;
    }

    /**
     * Updates the seat's basic information.
     * @param seatId - New seat ID
     * @param rowNum - New row label
     * @param seatNum - New seat number
     * @param zipZone - New zip zone
     * @param price - New price (must be a valid non-negative number)
     */
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

    /**
     * Gets the seat's ID.
     * @returns Seat ID as a string.
     */
    getSeatId(): string {
        return this.seatId;
    }

    /**
     * Gets the current seat status.
     * @returns SeatStatus enum value.
     */
    getStatus(): SeatStatus {
        return this.status;
    }

    /**
     * Updates the status of the seat (e.g., to RESERVED or OCCUPIED).
     * @param status - New status value (must be a valid SeatStatus).
     */
    setStatus(status: SeatStatus): void {
        const validStatuses = Object.keys(SeatStatus).map(
            key => SeatStatus[key as keyof typeof SeatStatus]
        ) as SeatStatus[];

        if (!validStatuses.includes(status)) {
            throw new Error("Invalid seat status");
        }
        this.status = status;
    }

    /**
     * Links this seat to a specific MovieRoom.
     * @param movieRoom - MovieRoom object to associate with this seat.
     */
    setMovieRoom(movieRoom: MovieRoom): void {
        this.movieRoom = movieRoom;
    }

    /**
     * Gets the row label of the seat.
     * @returns Row label as a string.
     */
    getRow(): string {
        return this.row;
    }

    /**
     * Gets the seat number in the row.
     * @returns Seat number as a string.
     */
    getSeatNum(): string {
        return this.seatNum;
    }

    /**
     * Gets the zip zone of the seat.
     * @returns ZipZone enum value.
     */
    getZipZone(): ZipZone {
        return this.zipZone;
    }

    /**
     * Gets the price of the seat.
     * @returns Price as a string.
     */
    getPrice(): string {
        return this.price;
    }
}
