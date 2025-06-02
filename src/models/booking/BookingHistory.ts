import { Booking } from "./Booking";
import { User } from "../user/User"; 

export class BookingHistory {
    constructor(
        private historyId: string, 
        private userId: string,   
        private bookings: Booking[] = [],
        private entries: string[] = []
    ) {}

    getHistoryId(): string {
        return this.historyId;
    }

    getUserId(): string {
        return this.userId;
    }

    getBookings(): Booking[] {
        return this.bookings;
    }

    getUser(): User {
        throw new Error("getUser() not implemented yet. Requires User class integration.");
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
        const booking = this.bookings.find(b => b.getId() === bookingId);
        if (booking) {
            booking.setStatus(status); 
        } else {
            throw new Error(`Booking with ID ${bookingId} not found`);
        }
    }
    // New method to add a history entry
    addEntry(entry: string): void {
        if (!entry) {
            throw new Error("Entry cannot be empty");
        }
        this.entries.push(entry);
    }

    getEntries(): string[] {
        return this.entries;
    }
}