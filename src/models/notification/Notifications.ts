import { Booking } from "../booking/Booking";
import { ShowTime } from "../showtime/ShowTime";
import { User } from "../user/User";

export class Notifications {
    /**
     * Constructor to initialize a notification instance.
     * @param idNotification - Unique ID for the notification.
     * @param message - The content/message of the notification.
     * @param type - The type/category of the notification.
     * @param sentAt - Date and time when the notification was sent.
     * @param user - (Optional) User who receives the notification.
     */
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

    /**
     * Sends a booking confirmation notification to a user.
     * @param user - The user who will receive the notification.
     * @param booking - The booking associated with the notification.
     * Throws an error if user or booking is not provided.
     */
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

    /**
     * Sends a booking cancellation notice to a user.
     * @param user - The user who will receive the cancellation notice.
     * @param booking - The booking that has been cancelled.
     * Throws an error if user or booking is not provided.
     */
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

    /**
     * Sends a showtime reminder notification to a user.
     * @param user - The user who will receive the reminder.
     * @param showtime - The showtime associated with the reminder.
     * Throws an error if user or showtime is not provided.
     */
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

    /**
     * Retrieves the user associated with the notification.
     * @returns The user object or undefined if not assigned.
     */
    getUser(): User | undefined {
        return this.user;
    }

    /**
     * Retrieves the message content of the notification.
     * @returns The message string.
     */
    getMessage(): string {
        return this.message;
    }
}
