import { Booking } from "../booking/Booking";
import { BookingHistory } from "../booking/BookingHistory";
import { Seat } from "../booking/Seat";
import { SeatStatus } from "../enum/SeatStatus";
import { Review } from "../review/Review";
import { ShowTime } from "../showtime/ShowTime";
import { Person } from "./Person";
import { Payment } from "../booking/Payment";

const users: User[] = [];
export class User extends Person {
    private bookingHistory: BookingHistory;
    
    constructor(
        name: string,
        email: string,
        phone: string,
        private userId: string,
        private password: string,
        private bookings: Booking[] = [],
        private reviews: Review[] = []
    ) {
        super(name, email, phone);
        this.bookingHistory = new BookingHistory(`HIST-${userId}`, userId);
    }

    public static register(user: User): void {
        if (!user.getName() || user.getName().trim().length < 2) {
            throw new Error("Name must be at least 2 characters long.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.getEmail() || !emailRegex.test(user.getEmail())) {
            throw new Error("Invalid email format.");
        }

        const phoneStr = user.getPhone().replace(/\D/g, '');
        if (!user.getPhone() || phoneStr.length < 10 || phoneStr.length > 12) {
            throw new Error("Phone number must be between 10 and 12 digits long.");
        }

        if (!user.userId || user.userId.length < 5) {
            throw new Error("User ID must be at least 5 characters long.");
        }

        if (!user.password || user.password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }

        const existingEmail = users.find(u => u.getEmail() === user.getEmail());
        if (existingEmail) {
            throw new Error(`Email "${user.getEmail()}" is already registered.`);
        }

        const existingUserId = users.find(u => u.userId === user.userId);
        if (existingUserId) {
            throw new Error(`User ID "${user.userId}" is already in use.`);
        }

        users.push(user);
        console.log(`User "${user.getName()}" registered successfully.`);
    }

    public static login(email: string, password: string): User {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }

        if (!password || password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }

        const user = users.find(u => u.getEmail() === email);
        if (!user) {
            throw new Error(`User with email "${email}" not found.`);
        }

        if (user.password !== password) {
            throw new Error("Incorrect password.");
        }

        console.log(`✅ User "${user.getName()}" logged in successfully.`);
        return user;
    }

    public static getAllUsers(): User[] {
        return [...users];
    }

    public getUserId(): string {
        return this.userId;
    }

    public getPassword(): string {
        return this.password;
    }

    public getBookingHistory(): BookingHistory {
        return this.bookingHistory;
    }

    public createBooking(showtime: ShowTime, seats: Seat[], paymentMethod: string): Booking {
        if (!showtime || !showtime.hasSeatsAvailable()) {
            throw new Error("Invalid showtime or no seats available.");
        }

        const selectedSeats = seats.filter(seat => showtime.isSeatAvailable(seat));
        if (selectedSeats.length !== seats.length) {
            throw new Error("One or more selected seats are not available.");
        }

        const totalAmount = seats.reduce((sum, seat) => sum + showtime.calculatePrice(seat), 0);
        
        const bookingId = `BOOK-${Date.now()}`;
        const booking = new Booking(
            bookingId,
            this.userId,
            showtime.getShowtimeId(),
            selectedSeats,
            [],
            null,
            this.bookingHistory
        );

        const payment = new Payment(
            Date.now(),
            booking,
            totalAmount
        );
        payment.processPayment(totalAmount, paymentMethod);
        booking.setPayment(payment);

        this.bookings.push(booking);
        this.bookingHistory.addBooking(booking);

        selectedSeats.forEach(seat => {
            seat.setMovieRoom(showtime.getMovieRoom());
            seat.setStatus(SeatStatus.BOOKED);
            const ticket = booking.generateTicket(seat);
            this.bookingHistory.addEntry(`Ticket ${ticket.generateQRCode()} created for seat ${seat.getSeatId()}`);
        });

        booking.confirmBooking();
        return booking;
    }

    public cancelBooking(bookingId: string): void {
        const booking = this.bookings.find(b => b.getId() === bookingId);
        if (!booking) {
            throw new Error(`Booking with ID ${bookingId} not found.`);
        }
        booking.cancelBooking();
        this.bookingHistory.addEntry(`Booking ${bookingId} cancelled on ${new Date()}`);
    }

    public addReview(review: Review): void {
        if (!review) {
            throw new Error("Review is required");
        }
        this.reviews.push(review);
        this.bookingHistory.addEntry(`Review ${review.getReviewId()} added on ${new Date()}`);
    }

    public getReviews(): Review[] {
        return [...this.reviews];
    }
}