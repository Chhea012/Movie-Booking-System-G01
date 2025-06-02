import { CancellationStatus } from "../enum/CancellationStatus";
import { Booking } from "./Booking";

export class Cancellation {
    private readonly cancelId: string;
    private booking: Booking;
    private status: CancellationStatus;
    private reason: string;

    constructor(cancelId: string, booking: Booking) {
        if (!cancelId || !booking) {
            throw new Error("Cancel ID and booking are required");
        }
        this.cancelId = cancelId;
        this.booking = booking;
        this.status = CancellationStatus.PENDING;
        this.reason = "";
    }

    getCancelId(): string {
        return this.cancelId;
    }

    getBooking(): Booking {
        return this.booking;
    }

    getStatus(): CancellationStatus {
        return this.status;
    }

    getReason(): string {
        return this.reason;
    }
    // Method to cancel the booking
    cancelBooking(booking: Booking, reason: string): void {
        if (this.status !== CancellationStatus.PENDING) {
            throw new Error("Cancellation can only be processed if status is PENDING");
        }
        if (booking !== this.booking) {
            throw new Error("Provided booking does not match the cancellation's booking");
        }
        this.reason = reason;
        this.status = CancellationStatus.COMPLETED;
        booking.setStatus("CANCELLED");
    }
    // Method to update the cancellation reason
    updateReason(reason: string): void {
        if (!reason) {
            throw new Error("Reason cannot be empty");
        }
        this.reason = reason;
    }
}
