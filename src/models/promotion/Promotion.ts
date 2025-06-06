export class Promotion {
    /**
     * Constructor to initialize a Promotion instance.
     * @param promoteId - Unique ID of the promotion.
     * @param code - Discount code string.
     * @param discount - Discount percentage (0–100).
     * @param description - Description of the promotion.
     * @param isActive - Status indicating if the promotion is active.
     * Throws an error if required fields are missing or if discount is invalid.
     */
    constructor(
        private promoteId: number,
        private code: string,
        private discount: number,
        private description: string,
        private isActive: boolean
    ) {
        if (!promoteId || !code || !description) {
            throw new Error("Promotion ID, code, and description are required.");
        }
        if (typeof discount !== "number" || discount < 0 || discount > 100) {
            throw new Error("Discount must be a number between 0 and 100.");
        }
    }

    /**
     * Applies the promotion discount to a given amount.
     * @param amount - The original amount before discount.
     * @returns The amount after applying the discount, or the original amount if not active.
     */
    applyDiscount(amount: number): number {
        if (amount <= 0 || !this.isActive) {
            return amount;
        }
        const discountAmount = (amount * this.discount) / 100;
        return Number((amount - discountAmount).toFixed(2));
    }

    /**
     * Updates the details of the promotion.
     * @param code - (Optional) New discount code.
     * @param discount - (Optional) New discount percentage (0–100).
     * @param description - (Optional) New promotion description.
     * @param isActive - (Optional) New active status.
     * Throws errors for invalid input values.
     */
    updateDiscount(
        code?: string,
        discount?: number,
        description?: string,
        isActive?: boolean
    ): void {
        if (code !== undefined) {
            if (!code) throw new Error("Code cannot be empty.");
            this.code = code;
        }
        if (discount !== undefined) {
            if (typeof discount !== "number" || discount < 0 || discount > 100) {
                throw new Error("Discount must be a number between 0 and 100.");
            }
            this.discount = discount;
        }
        if (description !== undefined) {
            if (!description) throw new Error("Description cannot be empty.");
            this.description = description;
        }
        if (isActive !== undefined) {
            this.isActive = isActive;
        }
    }

    /**
     * Checks if the promotion is currently active.
     * @returns True if active, false otherwise.
     */
    getIsActive(): boolean {
        return this.isActive;
    }

    /**
     * Validates if a given discount code matches the promotion's code and is active.
     * @param inputCode - The discount code to validate.
     * @returns True if code matches and promotion is active, false otherwise.
     */
    validateCode(inputCode: string): boolean {
        return this.code === inputCode && this.isActive;
    }

    /**
     * Retrieves the discount percentage.
     * @returns The discount value (0–100).
     */
    getDiscount(): number {
        return this.discount;
    }

    /**
     * Retrieves the promotion's discount code.
     * @returns The promotion code string.
     */
    getCode(): string {
        return this.code;
    }

    /**
     * Retrieves the description of the promotion.
     * @returns The description string.
     */
    getDescription(): string {
        return this.description;
    }

    /**
     * Retrieves the unique ID of the promotion.
     * @returns The promotion ID as a number.
     */
    getPromoteId(): number {
        return this.promoteId;
    }
}
