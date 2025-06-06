// Import necessary classes
import { Person } from "../user/Person"; // Inherits basic info like name, email, phone
import { Cinema } from "./Cinema";       // Represents the cinema the staff belongs to
import { Ticket } from "../booking/Ticket"; // (Imported but not used in this class)

/**
 * CinemaStaff class extends Person to represent a staff member working at a specific cinema.
 */
export class CinemaStaff extends Person {
    private idCinemaStaff: number; // Unique ID for the cinema staff member
    private cinema: Cinema;        // The cinema the staff is assigned to

    /**
     * Constructor for creating a CinemaStaff instance.
     * @param idCinemaStaff - The unique ID of the staff member.
     * @param cinema - The cinema where the staff member works.
     * @param name - The name of the staff member.
     * @param email - The email of the staff member.
     * @param phone - The phone number of the staff member.
     */
    constructor(
        idCinemaStaff: number,
        cinema: Cinema,
        name: string,
        email: string,
        phone: string
    ) {
        super(name, email, phone); // Call the Person constructor
        if (!idCinemaStaff || !cinema) {
            throw new Error("Staff ID and cinema are required");
        }
        this.idCinemaStaff = idCinemaStaff;
        this.cinema = cinema;
    }

    /**
     * Updates the staff ID number.
     * @param staffNumber - The new staff number as a string.
     * Throws an error if the input is not a valid number.
     */
    updateStaffNumber(staffNumber: string): void {
        const parsedNumber = parseInt(staffNumber);
        if (isNaN(parsedNumber)) {
            throw new Error("Invalid staff number: must be a valid number");
        }
        this.idCinemaStaff = parsedNumber;
    }

    /**
     * Retrieves the Cinema instance assigned to the staff.
     * @returns The cinema associated with the staff member.
     */
    getCinema(): Cinema {
        return this.cinema;
    }

    /**
     * Retrieves the Person instance (self).
     * @returns The CinemaStaff instance as a Person.
     */
    getPerson(): Person {
        return this;
    }

    /**
     * Validates a QR code string.
     * Expected format: "QR-xxxx-xxxx" (must start with "QR-" and have at least 3 parts when split by "-").
     * @param qrCode - The QR code string to validate.
     * @returns True if the QR code format is valid, otherwise false.
     */
    checkQRCode(qrCode: string): boolean {
        if (!qrCode || typeof qrCode !== "string" || !qrCode.startsWith("QR-")) {
            return false;
        }
        const parts = qrCode.split("-");
        if (parts.length < 3) {
            return false;
        }
        return true;
    }

    /**
     * Retrieves the staff ID number.
     * @returns The staff ID as a number.
     */
    getStaffId(): number {
        return this.idCinemaStaff;
    }

    /**
     * Updates the contact details of the staff member.
     * Uses inherited updateDetails from Person.
     * @param email - The new email address.
     * @param phone - The new phone number.
     */
    updateContactDetails(email: string, phone: string): void {
        this.updateDetails(this.getName(), email, phone); // Reuse Person's method
    }

    /**
     * Assigns a new cinema to the staff member.
     * @param cinema - The new Cinema instance.
     * Throws an error if no cinema is provided.
     */
    assignToCinema(cinema: Cinema): void {
        if (!cinema) {
            throw new Error("A valid cinema must be provided");
        }
        this.cinema = cinema;
    }
}
