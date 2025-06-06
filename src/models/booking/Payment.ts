import { PaymentStatus } from "../enum/PaymentStatus";
import { Booking } from "./Booking";
export class Payment {
    private taxes: number = 0;
    private bookingFee: number = 0;

    /**
     * @param paymentId - Unique identifier for the payment.
     * @param booking - The associated booking object.
     * @param total - Base total amount before fees and taxes.
     * @param paymentMethod - (Optional) Method used for payment.
     * @param status - (Optional) Initial status of the payment (default is PPENDING).
     * @throws Error if paymentId or booking is missing, or if total is invalid.
     */
    constructor(
        private paymentId: number,
        private booking: Booking,
        private total: number,
        private paymentMethod: string = "",
        private status: PaymentStatus = PaymentStatus.PPENDING
    ) {
        if (!paymentId || !booking || total <= 0) {
            throw new Error("Payment ID, booking, and valid total amount are required");
        }
    }

    /**
     * Processes the payment if the amount matches and method is valid.
     * Applies booking fee and taxes, then updates the payment status.
     * @param amount - Amount being paid (must match total).
     * @param paymentMethod - Payment method: "Credit Card", "Debit Card", or "Cash".
     * @throws Error if amount is invalid, method is not supported, or payment is not pending.
     */
    processPayment(amount: number, paymentMethod: string): void {
        if (amount <= 0 || amount !== this.total) {
            throw new Error("Amount must match the total and be greater than 0");
        }

        const validMethods = ["Credit Card", "Debit Card", "Cash"];
        if (!validMethods.includes(paymentMethod)) {
            throw new Error("Invalid payment method. Use 'Credit Card', 'Debit Card', or 'Cash'");
        }

        if (this.status !== PaymentStatus.PPENDING) {
            throw new Error("Payment has already been processed, failed, or cancelled");
        }

        this.bookingFee = this.applyBookingFee();
        this.taxes = this.calculateTaxes();
        this.total = Number((this.total + this.bookingFee + this.taxes).toFixed(2));
        this.paymentMethod = paymentMethod;
        this.status = PaymentStatus.COMPLETE;
    }

    /**
     * Refunds the payment if it was completed and the booking is cancelled.
     * @throws Error if the payment is not COMPLETE or the booking is not CANCELLED.
     */
    refundPayment(): void {
        if (this.status !== PaymentStatus.COMPLETE) {
            throw new Error("Payment must be COMPLETED to process a refund");
        }

        if (this.booking.getStatus() !== "CANCELLED") {
            throw new Error("Booking must be CANCELLED to refund the payment");
        }

        this.status = PaymentStatus.CANCELLED;
    }

    /**
     * Updates the payment status to a valid new state.
     * @param status - New status (PPENDING, COMPLETE, FAILED, CANCELLED).
     * @throws Error if the status is not one of the allowed values.
     */
    updateStatus(status: PaymentStatus): void {
        const validStatuses = [
            PaymentStatus.PPENDING,
            PaymentStatus.COMPLETE,
            PaymentStatus.FAILED,
            PaymentStatus.CANCELLED
        ];

        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status. Use 'pending', 'completed', 'failed', or 'cancelled'");
        }

        this.status = status;
    }

    /**
     * Returns the associated booking object.
     * @returns The Booking linked to this payment.
     */
    getBooking(): Booking {
        return this.booking;
    }

    /**
     * Applies a fixed booking fee.
     * @returns The applied booking fee.
     */
    applyBookingFee(): number {
        const fee = 2;
        this.bookingFee = fee;
        return this.bookingFee;
    }

    /**
     * Calculates and applies taxes based on the total.
     * @returns The calculated tax amount.
     */
    calculateTaxes(): number {
        const taxRate = 0.05;
        this.taxes = Number((this.total * taxRate).toFixed(2));
        return this.taxes;
    }

    /**
     * Returns the payment ID.
     * @returns The unique identifier for the payment.
     */
    getPaymentId(): number {
        return this.paymentId;
    }

    /**
     * Returns the tax amount.
     * @returns The calculated taxes.
     */
    getTaxes(): number {
        return this.taxes;
    }

    /**
     * Returns the booking fee applied.
     * @returns The booking fee.
     */
    getBookingFee(): number {
        return this.bookingFee;
    }

    /**
     * Returns the method used for payment.
     * @returns The payment method string.
     */
    getPaymentMethod(): string {
        return this.paymentMethod;
    }

    /**
     * Returns the total amount paid (including fees and taxes).
     * @returns The total amount.
     */
    getTotal(): number {
        return this.total;
    }

    /**
     * Returns the current status of the payment.
     * @returns The payment status.
     */
    getStatus(): PaymentStatus {
        return this.status;
    }
}
