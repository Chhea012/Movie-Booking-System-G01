import { Booking } from "../booking/Booking";
import { Movie } from "../showtime/Movie";
import { ShowTime } from "../showtime/ShowTime";
import { User } from "../user/User";

export class Notifications {
    constructor(
        private idNotification: string,
        private message: string,
        private type: string,
        private sentAt: Date,
        private user?: User
    ) {
        if (!idNotification || !type || !sentAt) {
            throw new Error("Notification ID, type, and sent date are required");
        }
    }

    sendBookingConfirmation(user: User, booking: Booking): void {
        if (!user || !booking) {
            throw new Error("User and booking are required");
        }
        this.message = `Booking confirmed for ${booking.getId()}`;
        this.type = "Booking Confirmation";
        this.user = user;
        this.sentAt = new Date();
        console.log(`${this.type}: ${this.message} for user ${user.getUserId()} at ${this.sentAt}`);
    }

    sendCancellationNotice(user: User, booking: Booking): void {
        if (!user || !booking) {
            throw new Error("User and booking are required");
        }
        this.message = `Booking ${booking.getId()} has been cancelled`;
        this.type = "Cancellation Notice";
        this.user = user;
        this.sentAt = new Date();
        console.log(`${this.type}: ${this.message} for user ${user.getUserId()} at ${this.sentAt}`);
    }

    sendShowtimeReminder(user: User, showtime: ShowTime): void {
        if (!user || !showtime) {
            throw new Error("User and showtime are required");
        }
        this.message = `Reminder: Showtime for ${showtime.getMovie().getTitle()} at ${showtime.getStartTime()}`;
        this.type = "Showtime Reminder";
        this.user = user;
        this.sentAt = new Date();
        console.log(`${this.type}: ${this.message} for user ${user.getUserId()} at ${this.sentAt}`);
    }
    // add method to send new movie alert
     sendNewMovieAlert(user: User, movie: Movie): void {
        if (!user || !movie) {
            throw new Error("User and movie are required");
        }
        this.message = `New movie added: ${movie.getTitle()} (${movie.getId()})`;
        this.type = "New Movie Alert";
        this.user = user;
        this.sentAt = new Date();
        console.log(`${this.type}: ${this.message} for user ${user.getUserId()} at ${this.sentAt}`);
    }
    getUser(): User | undefined {
        return this.user;
    }

    getMessage(): string {
        return this.message;
    }
    sendNewMovieNotification(users: User[], movie: Movie) {
        users.forEach(user => {
            console.log(`Notification sent to ${user.getName()}: New movie '${movie.getTitle()}' added!`);
        });
    }
}