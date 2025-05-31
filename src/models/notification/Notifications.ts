import { Booking } from "../booking/Booking";
import { ShowTime } from "../showtime/ShowTime";
import { User } from "../user/User";

export class Notifications {
    constructor(
        private idNotification: string,
        private message: string,
        private type: string,
        private sentAt: Date,
        private user?: User // Optional user field to associate with the notification
    ){}

    sendBookingConfirmation(user:User, booking:Booking): void{
        this.message = `Booking confirmed for ${booking.getId()}`;
        this.type = "Booking Confirmation";
        this.user = user; // Set the user for this notification
        
    }

    sendCancellationNotice(user: User, booking: Booking): void {
        this.message = `Booking ${booking.getId()} has been cancelled`;
        this.type = "Cancellation Notice";
        this.user = user;
        console.log(`${this.type}: ${this.message} for user ${user.getuserId()} at ${this.sentAt}`);
    }

    sendShowtimeReminder(user: User, showtime: ShowTime): void {
        this.message = `Reminder: Showtime for ${showtime.getMovie().getTitle()} at ${showtime.getStartTime()}`;
        this.type = "Showtime Reminder";
        this.user = user;
        console.log(`${this.type}: ${this.message} for user ${user.getuserId()} at ${this.sentAt}`);
    }

    getUser(): User | undefined {
        return this.user;
    }
 }
