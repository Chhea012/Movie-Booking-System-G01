import { CancellationStatus } from "../enum/CancellationStatus";
import { Booking } from "./Booking";

export class Cancellation {
    private reason: string = "";

    constructor(
        private cancelId: string,
        private booking: Booking
    ) {
        if (!cancelId || !booking) {
            throw new Error("Cancel ID and booking are required");
        }
        this.status = CancellationStatus.PENDING;
    }

    private status: CancellationStatus;

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

    cancelBooking(booking: Booking, reason: string): void {
        if (this.status !== CancellationStatus.PENDING) {
            throw new Error("Cancellation can only be processed if status is PENDING");
        }
        if (booking !== this.booking) {
            throw new Error("Provided booking does not match the cancellation's booking");
        }
        if (!reason) {
            throw new Error("Reason cannot be empty");
        }
        this.reason = reason;
        this.status = CancellationStatus.COMPLETED;
        booking.setStatus("CANCELLED");
    }

    updateReason(reason: string): void {
        if (!reason) {
            throw new Error("Reason cannot be empty");
        }
        this.reason = reason;
    }
}