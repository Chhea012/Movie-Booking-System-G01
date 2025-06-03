import { MovieRoom } from "../showtime/MovieRoom";
import { ShowTime } from "../showtime/ShowTime";
import { CinemaStaff } from "./CinemaStaff";

export class Cinema {
    constructor(
        private cinemaId: string,
        private name: string,
        private address: string,
        private staff: CinemaStaff[] = [],
        private showtimes: ShowTime[] = [],
        private movieRooms: MovieRoom[] = []
    ) {}

    addCinemaStaff(staff: CinemaStaff): void {
        this.staff.push(staff);
    }

    removeCinemaStaff(staffId: string): void {
        const parsedStaffId = parseInt(staffId);
        if (isNaN(parsedStaffId)) {
            throw new Error("Invalid staff ID: must be a valid number");
        }
        this.staff = this.staff.filter(staff => staff.getStaffId() !== parsedStaffId);
    }

    addShowtime(showtime: ShowTime): void {
        this.showtimes.push(showtime);
    }

    removeShowtime(showtimeId: string): void {
        this.showtimes = this.showtimes.filter(showtime => showtime.getShowtimeId() !== showtimeId);
    }

    getShowtimes(): ShowTime[] {
        return [...this.showtimes];
    }

    getCinemaStaff(): CinemaStaff[] {
        return [...this.staff];
    }

    updateDetails(cinemaId: string, name: string, address: string): void {
        this.cinemaId = cinemaId;
        this.name = name;
        this.address = address;
    }

    getMovieRooms(): MovieRoom[] {
        return [...this.movieRooms];
    }
    getaddress(): string{
        return this.address
    }
    getCinemaId(): string {
        return this.cinemaId;
    }
    
}