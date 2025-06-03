export class Promotion {
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
        this.promoteId = promoteId;
        this.code = code;
        this.discount = discount;
        this.description = description;
        this.isActive = isActive;
    }

    applyDiscount(amount: number): number {
        if (amount <= 0 || !this.isActive) {
            return amount;
        }
        const discountAmount = (amount * this.discount) / 100;
        return Number((amount - discountAmount).toFixed(2)); 
    }

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

    getIsActive(): boolean {
        return this.isActive;
    }

    validateCode(inputCode: string): boolean {
        return this.code === inputCode && this.isActive;
    }

    getDiscount(): number {
        return this.discount;
    }

    getCode(): string {
        return this.code;
    }

    getDescription(): string {
        return this.description;
    }

    getPromoteId(): number {
        return this.promoteId;
    }
}