import { MovieRoom } from "../showtime/MovieRoom";
import { ShowTime } from "../showtime/ShowTime";
import { CinemaStaff } from "./CinemaStaff";

export class Cinema {
    private movieRooms: MovieRoom[] = [];
    private showtimes: ShowTime[] = [];
    private staff: CinemaStaff[] = [];

    constructor(
        private cinemaId: string,
        private name: string,
        private address: string
    ) {
        if (!cinemaId || !name || !address) {
            throw new Error("Cinema ID, name, and address are required");
        }
    }

    addCinemaStaff(staff: CinemaStaff): void {
        if (!staff) {
            throw new Error("Staff is required");
        }
        this.staff.push(staff);
    }

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

    addShowtime(showtime: ShowTime): void {
        if (!showtime) {
            throw new Error("Showtime is required");
        }
        this.showtimes.push(showtime);
    }

    removeShowtime(showtimeId: string): void {
        if (!showtimeId) {
            throw new Error("Showtime ID is required");
        }
        this.showtimes = this.showtimes.filter(showtime => showtime.getShowtimeId() !== showtimeId);
    }

    getShowtimes(): ShowTime[] {
        return [...this.showtimes];
    }

    getCinemaStaff(): CinemaStaff[] {
        return [...this.staff];
    }

    updateDetails(cinemaId: string, name: string, address: string): void {
        if (!cinemaId || !name || !address) {
            throw new Error("Cinema ID, name, and address are required");
        }
        this.cinemaId = cinemaId;
        this.name = name;
        this.address = address;
    }

    getMovieRooms(): MovieRoom[] {
        return [...this.movieRooms];
    }

    addMovieRoom(room: MovieRoom): void {
        if (!room) {
            throw new Error("Movie room is required");
        }
        this.movieRooms.push(room);
    }

    getAddress(): string {
        return this.address;
    }
}