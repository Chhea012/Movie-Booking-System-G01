import { Booking } from "./Booking";
import { User } from "../user/User";

export class BookingHistory {
    private entries: string[] = [];

    /**
     * Constructor to initialize booking history.
     * @param historyId - Unique ID of the history record.
     * @param userId - ID of the user owning this history.
     * @param bookings - Optional list of existing bookings.
     */
    constructor(
        private historyId: string,
        private userId: string,
        private bookings: Booking[] = []
    ) {
        if (!historyId || !userId) {
            throw new Error("History ID and user ID are required");
        }
    }

    /**
     * Returns the unique ID of the booking history.
     */
    getHistoryId(): string {
        return this.historyId;
    }

    /**
     * Returns the user ID associated with this booking history.
     */
    getUserId(): string {
        return this.userId;
    }

    /**
     * Returns a copy of all bookings in the history.
     */
    getBookings(): Booking[] {
        return [...this.bookings];
    }

    /**
     * Returns the User object associated with the userId.
     * Throws an error if the user is not found.
     */
    getUser(): User {
        const user = User.getAllUsers().find(u => u.getUserId() === this.userId);
        if (!user) {
            throw new Error(`User with ID ${this.userId} not found`);
        }
        return user;
    }

    /**
     * Adds a new booking to the history.
     * @param booking - The booking to be added.
     */
    addBooking(booking: Booking): void {
        if (!booking) {
            throw new Error("Booking is required");
        }
        this.bookings.push(booking);
    }

    /**
     * Returns bookings that are scheduled in the future and not cancelled.
     */
    getUpcomingBookings(): Booking[] {
        const now = new Date();
        return this.bookings.filter(booking => {
            const showtimeStart = new Date(booking.getShowtime().getStartTime());
            return showtimeStart > now && booking.getStatus() !== "CANCELLED";
        });
    }

    /**
     * Returns bookings that have already happened or are cancelled.
     */
    getPastBookings(): Booking[] {
        const now = new Date();
        return this.bookings.filter(booking => {
            const showtimeStart = new Date(booking.getShowtime().getStartTime());
            return showtimeStart <= now || booking.getStatus() === "CANCELLED";
        });
    }

    /**
     * Updates the status of a specific booking.
     * @param bookingId - ID of the booking to update.
     * @param status - New status to assign to the booking.
     */
    updateBookingStatus(bookingId: string, status: string): void {
        if (!bookingId || !status) {
            throw new Error("Booking ID and status are required");
        }
        const booking = this.bookings.find(b => b.getId() === bookingId);
        if (!booking) {
            throw new Error(`Booking with ID ${bookingId} not found`);
        }
        booking.setStatus(status);
        this.addEntry(`Booking ${bookingId} status updated to ${status} on ${new Date()}`);
    }

    /**
     * Adds a text entry to the booking history log.
     * @param entry - Description of the action/event.
     */
    addEntry(entry: string): void {
        if (!entry) {
            throw new Error("Entry cannot be empty");
        }
        this.entries.push(entry);
    }

    /**
     * Returns a copy of all log entries in the history.
     */
    getEntries(): string[] {
        return [...this.entries];
    }
}
