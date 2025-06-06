export abstract class Person {
    /**
     * Constructor for creating a Person instance.
     * @param name - The person's full name.
     * @param email - The person's email address.
     * @param phone - The person's phone number.
     */
    constructor(
        protected name: string,
        protected email: string,
        protected phone: string
    ) {}

    /**
     * Updates the person's contact details after validating inputs.
     * @param name - New name for the person.
     * @param email - New email address (must be valid format).
     * @param phone - New phone number (digits only, 10-12 digits).
     * Throws an error if any input is invalid.
     */
    updateDetails(name: string, email: string, phone: string): void {
        if (!name || !email || !phone) {
            throw new Error("Name, email, and phone must be provided");
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }

        // Remove non-digit characters and validate phone length
        const phoneStr = phone.replace(/\D/g, '');
        if (phoneStr.length < 10 || phoneStr.length > 12) {
            throw new Error("Phone number must be between 10 and 12 digits long.");
        }

        // Update properties if valid
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    /**
     * Retrieves the person's name.
     * @returns The name as a string.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Retrieves the person's email address.
     * @returns The email as a string.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Retrieves the person's phone number.
     * @returns The phone number as a string.
     */
    public getPhone(): string {
        return this.phone;
    }
}
