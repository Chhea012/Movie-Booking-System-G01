import { MovieRoom } from "../showtime/MovieRoom";
import { ShowTime } from "../showtime/ShowTime";
import { CinemaStaff } from "./CinemaStaff";
export class Cinema {
    private movieRooms: MovieRoom[] = [];
    private showtimes: ShowTime[] = [];
    private staff: CinemaStaff[] = [];

    /**
     * Constructs a new Cinema object.
     * @param cinemaId - Unique identifier for the cinema
     * @param name - Name of the cinema
     * @param address - Address of the cinema
     */
    constructor(
        private cinemaId: string,
        private name: string,
        private address: string
    ) {
        if (!cinemaId || !name || !address) {
            throw new Error("Cinema ID, name, and address are required");
        }
    }

    /**
     * Adds a new staff member to the cinema.
     * @param staff - CinemaStaff object to be added
     */
    addCinemaStaff(staff: CinemaStaff): void {
        if (!staff) {
            throw new Error("Staff is required");
        }
        this.staff.push(staff);
    }

    /**
     * Removes a staff member from the cinema based on staff ID.
     * @param staffId - ID of the staff to remove
     */
    removeCinemaStaff(staffId: string): void {
        if (!staffId) {
            throw new Error("Staff ID is required");
        }
        const parsedStaffId = parseInt(staffId);
        if (isNaN(parsedStaffId)) {
            throw new Error("Invalid staff ID: must be a valid number");
        }
        this.staff = this.staff.filter(staff => staff.getStaffId() !== parsedStaffId);
    }

    /**
     * Adds a showtime to the cinema.
     * @param showtime - ShowTime object to be added
     */
    addShowtime(showtime: ShowTime): void {
        if (!showtime) {
            throw new Error("Showtime is required");
        }
        this.showtimes.push(showtime);
    }

    /**
     * Removes a showtime from the cinema based on its ID.
     * @param showtimeId - ID of the showtime to remove
     */
    removeShowtime(showtimeId: string): void {
        if (!showtimeId) {
            throw new Error("Showtime ID is required");
        }
        this.showtimes = this.showtimes.filter(showtime => showtime.getShowtimeId() !== showtimeId);
    }

    /**
     * Returns a list of all showtimes in the cinema.
     * @returns Array of ShowTime objects
     */
    getShowtimes(): ShowTime[] {
        return [...this.showtimes];
    }

    /**
     * Returns a list of all cinema staff.
     * @returns Array of CinemaStaff objects
     */
    getCinemaStaff(): CinemaStaff[] {
        return [...this.staff];
    }

    /**
     * Updates the cinema's basic details (ID, name, address).
     * @param cinemaId - New cinema ID
     * @param name - New cinema name
     * @param address - New address
     */
    updateDetails(cinemaId: string, name: string, address: string): void {
        if (!cinemaId || !name || !address) {
            throw new Error("Cinema ID, name, and address are required");
        }
        this.cinemaId = cinemaId;
        this.name = name;
        this.address = address;
    }

    /**
     * Returns a list of all movie rooms in the cinema.
     * @returns Array of MovieRoom objects
     */
    getMovieRooms(): MovieRoom[] {
        return [...this.movieRooms];
    }

    /**
     * Adds a new movie room to the cinema.
     * @param room - MovieRoom object to be added
     */
    addMovieRoom(room: MovieRoom): void {
        if (!room) {
            throw new Error("Movie room is required");
        }
        this.movieRooms.push(room);
    }

    /**
     * Returns the address of the cinema.
     * @returns Cinema address as a string
     */
    getAddress(): string {
        return this.address;
    }
}
