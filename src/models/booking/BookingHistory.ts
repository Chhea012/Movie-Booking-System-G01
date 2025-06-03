import { Booking } from "./Booking";
import { User } from "../user/User";

export class BookingHistory {
    private entries: string[] = [];

    constructor(
        private historyId: string,
        private userId: string,
        private bookings: Booking[] = []
    ) {
        if (!historyId || !userId) {
            throw new Error("History ID and user ID are required");
        }
    }

    getHistoryId(): string {
        return this.historyId;
    }

    getUserId(): string {
        return this.userId;
    }

    getBookings(): Booking[] {
        return [...this.bookings];
    }

    getUser(): User {
        const user = User.getAllUsers().find(u => u.getUserId() === this.userId);
        if (!user) {
            throw new Error(`User with ID ${this.userId} not found`);
        }
        return user;
    }

    addBooking(booking: Booking): void {
        if (!booking) {
            throw new Error("Booking is required");
        }
        this.bookings.push(booking);
    }

    getUpcomingBookings(): Booking[] {
        const now = new Date();
        return this.bookings.filter(booking => booking.getDate() > now);
    }

    getPastBookings(): Booking[] {
        const now = new Date();
        return this.bookings.filter(booking => booking.getDate() <= now);
    }

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

    addEntry(entry: string): void {
        if (!entry) {
            throw new Error("Entry cannot be empty");
        }
        this.entries.push(entry);
    }

    getEntries(): string[] {
        return [...this.entries];
    }
}