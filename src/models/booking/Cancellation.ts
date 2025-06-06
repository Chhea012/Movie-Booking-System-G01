import { CancellationStatus } from "../enum/CancellationStatus";
import { Booking } from "./Booking";

export class Cancellation {
    private reason: string = "";
    private status: CancellationStatus;

    /**
     * Constructs a Cancellation object linked to a booking.
     * @param cancelId - Unique ID for the cancellation.
     * @param booking - The booking being cancelled.
     */
    constructor(
        private cancelId: string,
        private booking: Booking
    ) {
        if (!cancelId || !booking) {
            throw new Error("Cancel ID and booking are required");
        }
        this.status = CancellationStatus.PENDING;
    }

    /**
     * Returns the cancellation ID.
     */
    getCancelId(): string {
        return this.cancelId;
    }

    /**
     * Returns the booking associated with the cancellation.
     */
    getBooking(): Booking {
        return this.booking;
    }

    /**
     * Returns the current cancellation status.
     */
    getStatus(): CancellationStatus {
        return this.status;
    }

    /**
     * Returns the reason provided for the cancellation.
     */
    getReason(): string {
        return this.reason;
    }

    /**
     * Processes the cancellation of a booking.
     * @param booking - The booking to cancel (must match the stored booking).
     * @param reason - The reason for the cancellation.
     */
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

    /**
     * Updates the reason for the cancellation.
     * @param reason - New reason to update.
     */
    updateReason(reason: string): void {
        if (!reason) {
            throw new Error("Reason cannot be empty");
        }
        this.reason = reason;
    }
}
