export abstract class Person {
    constructor(
        protected name: string,
        protected email: string,
        protected phone: string
    ) {}

    updateDetails(name: string, email: string, phone: string): void {
        if (!name || !email || !phone) {
            throw new Error("Name, email, and phone must be provided");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        const phoneStr = phone.replace(/\D/g, '');
        if (phoneStr.length < 10 || phoneStr.length > 12) {
            throw new Error("Phone number must be between 10 and 12 digits long.");
        }
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhone(): string {
        return this.phone;
    }
}