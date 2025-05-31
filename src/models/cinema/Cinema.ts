import { MovieRoom } from "../showtime/MovieRoom";
import { ShowTime } from "../showtime/ShowTime";
import { CinemaStaff } from "./CinemaStaff";

export class Cinema {
    constructor(
        private cinemaId: string,
        private name : string,
        private address : string,
        private staff: CinemaStaff [],
        private showtimes: ShowTime [],
        private movieRooms: MovieRoom []= []

    ){}
    //create method add cinemastaff
    addCinemaStaff(staff: CinemaStaff): void {
        this.staff.push(staff);
    }
    //create method removecinemastaff
    removeCinemaStaff(staffId: string): void {
        this.staff = this.staff.filter(staff => staff.getStaffId() !== staffId); // Assumes getStaffId() exists
    }
    //create method addshowtime
    addShowtime(showtime: ShowTime): void {
        this.showtimes.push(showtime);
    }
    //create method removeshowtime
    removeShowtime(showtimeId: string): void {
        this.showtimes = this.showtimes.filter(showtime => showtime.getShowtimeId() !== showtimeId); // Assumes getShowtimeId() exists
    }
    //create method getshowtimes
    getShowtimes(): ShowTime[] {
        return [...this.showtimes];
    }
    //create method getcinemastaff
    getCinemaStaff(): CinemaStaff[] {
        return [...this.staff];
    }
    //create method updatedetails
    updateDetails(cinemaId: string, name: string, address: string): void {
        this.cinemaId = cinemaId;
        this.name = name;
        this.address = address;
    }
    //create method getmovieroom
    getMovieRooms(): MovieRoom[] {
        return [...this.movieRooms];
    }
}