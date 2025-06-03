import { Person } from "../user/Person";
import { Cinema } from "./Cinema";
import { Ticket } from "../booking/Ticket";

export class CinemaStaff extends Person {
    constructor(
        private idCinemaStaff: number,
        private cinema: Cinema,
        name: string,
        email: string,
        phone: string
    ) {
        super(name, email, phone);
        if (!idCinemaStaff || !cinema) {
            throw new Error("Staff ID and cinema are required");
        }
    }

    updateStaffNumber(staffNumber: string): void {
        const parsedNumber = parseInt(staffNumber);
        if (isNaN(parsedNumber)) {
            throw new Error("Invalid staff number: must be a valid number");
        }
        this.idCinemaStaff = parsedNumber;
    }

    getCinema(): Cinema {
        return this.cinema;
    }

    getPerson(): Person {
        return this;
    }

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

    getStaffId(): number {
        return this.idCinemaStaff;
    }

    updateContactDetails(email: string, phone: string): void {
        if (!email || !phone) {
            throw new Error("Email and phone must be provided");
        }
        this.email = email;
        this.phone = phone;
    }

    assignToCinema(cinema: Cinema): void {
        if (!cinema) {
            throw new Error("A valid cinema must be provided");
        }
        this.cinema = cinema;
    }
}