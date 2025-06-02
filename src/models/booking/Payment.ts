import { PaymentStatus } from "../enum/PaymentStatus";
import { Booking } from "./Booking";

export class Payment {
    private paymentId: number;
    private booking: Booking;
    private taxes: number;
    private bookingFee: number;
    private paymentMethod: string;
    private total: number;
    private status: PaymentStatus;

    constructor(
        paymentId: number,
        booking: Booking,
        total: number,
        taxes: number = 0,
        bookingFee: number = 0,
        paymentMethod: string = "",
        status: PaymentStatus = PaymentStatus.PPENDING 
    ) {
        if (!paymentId || !booking || total <= 0) {
            throw new Error("Payment ID, booking, and valid total amount are required");
        }
        this.paymentId = paymentId;
        this.booking = booking;
        this.total = total;
        this.taxes = taxes;
        this.bookingFee = bookingFee;
        this.paymentMethod = paymentMethod;
        this.status = status;
    }

    // Rest of the methods remain the same
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
        this.total += this.bookingFee + this.taxes;
        this.paymentMethod = paymentMethod;
        this.status = PaymentStatus.COMPLETE;
    }

    refundPayment(): void {
        if (this.status !== PaymentStatus.COMPLETE) {
            throw new Error("Payment must be COMPLETED to process a refund");
        }
        if (this.booking.getStatus() !== "CANCELLED") {
            throw new Error("Booking must be CANCELLED to refund the payment");
        }
        this.status = PaymentStatus.CANCELLED;
    }

    updateStatus(status: PaymentStatus): void {
        const validStatuses = [PaymentStatus.PPENDING, PaymentStatus.COMPLETE, PaymentStatus.FAILED, PaymentStatus.CANCELLED];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status. Use 'pending', 'completed', 'failed', or 'cancelled'");
        }
        this.status = status;
    }

    getBooking(): Booking {
        return this.booking;
    }

    applyBookingFee(): number {
        const fee = 2;
        this.bookingFee = fee;
        return this.bookingFee;
    }

    calculateTaxes(): number {
        const taxRate = 0.05;
        this.taxes = this.total * taxRate;
        return this.taxes;
    }

    getPaymentId(): number {
        return this.paymentId;
    }

    getTaxes(): number {
        return this.taxes;
    }

    getBookingFee(): number {
        return this.bookingFee;
    }

    getPaymentMethod(): string {
        return this.paymentMethod;
    }

    getTotal(): number {
        return this.total;
    }

    getStatus(): PaymentStatus {
        return this.status;
    }
}