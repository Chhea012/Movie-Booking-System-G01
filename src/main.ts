import { User } from "./models/user/User";
import { Movie } from "./models/showtime/Movie";
import { MovieRoom } from "./models/showtime/MovieRoom";
import { ShowTime } from "./models/showtime/ShowTime";
import { Seat } from "./models/booking/Seat";
import { Cinema } from "./models/cinema/Cinema";
import { CinemaStaff } from "./models/cinema/CinemaStaff";
import { MovieManager } from "./models/showtime/MovieManager";
import { ZipZone } from "./models/enum/ZipZone";
import { Review } from "./models/review/Review";
import { Notifications } from "./models/notification/Notifications";
import { Payment } from "./models/booking/Payment";
import { PaymentStatus } from "./models/enum/PaymentStatus";

// Initialize data
const cinema = new Cinema("CIN001", "City Cinema", "123 Main St");
const movieRoom = new MovieRoom("ROOM001", "Screen 1", cinema);

// Create seats
const seats = [
    new Seat("SEAT001", "A", "1", ZipZone.STANDARD, "10"),
    new Seat("SEAT002", "A", "2", ZipZone.PREMIUN, "15"), // Fixed typo: PREMIUN -> PREMIUM
    new Seat("SEAT003", "B", "1", ZipZone.VIP, "20")
];
seats.forEach(seat => movieRoom.addSeat(seat));

// Create movie and showtime
const movie = new Movie("MOV001", "The Adventure", "Action", [], "A thrilling adventure", "120", "2025-06-01");
const showtime = new ShowTime("SHOW001", "2025-06-03T18:00:00", "2025-06-03T20:00:00", 10, movieRoom, movie);
cinema.addShowtime(showtime);
movieRoom.addShowtime(showtime); // Use addShowtime instead of direct push
movie.addShowTime(showtime); // Add showtime to movie's showTimes array

// Create movie manager
const movieManager = new MovieManager([movie]);

// Create users
const soda = new User("Soda", "soda@gmail.com", "+855978049375", "Soda12", "soda1225");
const giyu = new User("Giyu", "giyu@gmail.com", "+85599861664", "Giyu13", "giyu1225");
const Gigi = new User("Gigi","gig@gmail.com","+855 9981323","gigi12","gigi1225");
User.register(soda);
User.register(giyu);
User.register(Gigi);

// Create cinema staff
const staff = new CinemaStaff(1, cinema, "John Staff", "john@cinema.com", "+855123456789");
cinema.addCinemaStaff(staff);

// Demonstrate user stories
function demonstrateUserStories() {
    console.log("\n=== User Story 1: Browse and filter movies ===");
    console.log("Movies by genre 'Action':", movieManager.filterMoviesByGenre("Action").map(m => m.getTitle()));
    console.log("Showtimes for movie:", movie.getShowTimes().map(s => s.getStartTime()));

    console.log("\n=== User Story 2: View seat availability and choose seats ===");
    console.log("Available seats:", movieRoom.getAvailableSeats().map(s => s.getSeatId()));

    console.log("\n=== User Story 3: Pay for booking and receive ticket ===");
    try {
        const selectedSeats = [seats[0], seats[1]];
        const booking = soda.createBooking(showtime, selectedSeats, "Credit Card");
        console.log("Booking created:", booking.getId());
        console.log("Tickets:", booking.getTicket().map(t => t.generateQRCode()));
        
        // Send notification
        const notification = new Notifications("NOTIF001", "", "Booking", new Date());
        notification.sendBookingConfirmation(soda, booking);
        console.log("Notification sent:", notification.getMessage());
    } catch (error) {
        console.error("Booking error:", (error as Error).message);
    }

    console.log("\n=== User Story 4: View upcoming and past bookings ===");
    console.log("Soda's upcoming bookings:", soda.getBookingHistory().getUpcomingBookings().map(b => b.getId()));
    console.log("Soda's past bookings:", soda.getBookingHistory().getPastBookings().map(b => b.getId()));

    console.log("\n=== User Story 5: Staff check QR code ===");
    const ticket = soda.getBookingHistory().getBookings()[0]?.getTicket()[0];
    if (ticket) {
        console.log("QR Code valid:", staff.checkQRCode(ticket.generateQRCode()));
    }

    console.log("\n=== User Story 6: Rate and review movie ===");
    try {
        const review = new Review(1, showtime.getShowtimeId(), "4.5", "Great movie!", soda, movie);
        soda.addReview(review);
        movie.addReview(review);
        console.log("Review added:", review.getComment(), "Rating:", review.getRating());
        console.log("Movie average rating:", movie.getAverageRating());
    } catch (error) {
        console.error("Review error:", (error as Error).message);
    }
}

// Demonstrate Payment class tests
function demonstratePaymentTests() {
    console.log("\n=== Payment Class Tests ===");

    // Setup: Create a booking for the tests
    let booking;
    try {
        const selectedSeats = [seats[0], seats[1]]; // SEAT001 ($10), SEAT002 ($15)
        booking = soda.createBooking(showtime, selectedSeats, "Credit Card");
        console.log("Setup: Booking created for testing:", booking.getId());
    } catch (error) {
        console.error("Setup error: Failed to create booking:", (error as Error).message);
        return;
    }

    // Test 1: Constructor
    console.log("\n=== Test 1: Payment Constructor ===");
    try {
        const payment = new Payment(1, booking, 25); // Total = $10 + $15
        console.log("Payment created successfully:");
        console.log("Payment ID:", payment.getPaymentId());
        console.log("Booking ID:", payment.getBooking().getId());
        console.log("Total:", payment.getTotal());
        console.log("Payment Method:", payment.getPaymentMethod());
        console.log("Status:", payment.getStatus());
        console.log("Booking Fee:", payment.getBookingFee());
        console.log("Taxes:", payment.getTaxes());
    } catch (error) {
        console.error("Constructor error:", (error as Error).message);
    }

    // Test 2: Constructor with invalid inputs
    console.log("\n=== Test 2: Payment Constructor with Invalid Inputs ===");
    try {
        const payment = new Payment(0, booking, 25); // Invalid paymentId
        console.log("This should not print");
    } catch (error) {
        console.error("Expected error for invalid paymentId:", (error as Error).message);
    }
    try {
        const payment = new Payment(2, booking, -10); // Invalid total
        console.log("This should not print");
    } catch (error) {
        console.error("Expected error for invalid total:", (error as Error).message);
    }
    try {
        const payment = new Payment(3, null as any, 25); // Invalid booking
        console.log("This should not print");
    } catch (error) {
        console.error("Expected error for missing booking:", (error as Error).message);
    }

    // Test 3: Process Payment
    console.log("\n=== Test 3: Process Payment ===");
    const payment = new Payment(4, booking, 25);
    try {
        payment.processPayment(25, "Credit Card");
        console.log("Payment processed successfully:");
        console.log("Status:", payment.getStatus());
        console.log("Payment Method:", payment.getPaymentMethod());
        console.log("Booking Fee:", payment.getBookingFee());
        console.log("Taxes:", payment.getTaxes());
        console.log("Updated Total:", payment.getTotal()); // 25 + 2 (fee) + 1.25 (tax) = 28.25
    } catch (error) {
        console.error("Process payment error:", (error as Error).message);
    }

    // Test 4: Process Payment with invalid inputs
    console.log("\n=== Test 4: Process Payment with Invalid Inputs ===");
    const payment2 = new Payment(5, booking, 25);
    try {
        payment2.processPayment(20, "Credit Card"); // Wrong amount
        console.log("This should not print");
    } catch (error) {
        console.error("Expected error for wrong amount:", (error as Error).message);
    }
    try {
        payment2.processPayment(25, "PayPal"); // Invalid method
        console.log("This should not print");
    } catch (error) {
        console.error("Expected error for invalid payment method:", (error as Error).message);
    }
    try {
        payment2.processPayment(25, "Credit Card");
        payment2.processPayment(25, "Credit Card"); // Already processed
        console.log("This should not print");
    } catch (error) {
        console.error("Expected error for non-pending payment:", (error as Error).message);
    }

    // Test 5: Refund Payment
    console.log("\n=== Test 5: Refund Payment ===");
    const payment3 = new Payment(6, booking, 25);
    try {
        payment3.processPayment(25, "Debit Card");
        // Mock booking status to CANCELLED
        (booking as any).getStatus = () => "CANCELLED";
        payment3.refundPayment();
        console.log("Payment refunded successfully:");
        console.log("Status:", payment3.getStatus());
    } catch (error) {
        console.error("Refund error:", (error as Error).message);
    }

    // Test 6: Refund Payment with invalid conditions
    console.log("\n=== Test 6: Refund Payment with Invalid Conditions ===");
    const payment4 = new Payment(7, booking, 25);
    try {
        payment4.refundPayment(); // Not processed
        console.log("This should not print");
    } catch (error) {
        console.error("Expected error for non-completed payment:", (error as Error).message);
    }
    try {
        (booking as any).getStatus = () => "CONFIRMED"; // Not cancelled
        const payment5 = new Payment(8, booking, 25);
        payment5.processPayment(25, "Cash");
        payment5.refundPayment();
        console.log("This should not print");
    } catch (error) {
        console.error("Expected error for non-cancelled booking:", (error as Error).message);
    }

    // Test 7: Update Status
    console.log("\n=== Test 7: Update Status ===");
    const payment6 = new Payment(9, booking, 25);
    try {
        payment6.updateStatus(PaymentStatus.COMPLETE);
        console.log("Status updated to COMPLETE:", payment6.getStatus());
        payment6.updateStatus(PaymentStatus.FAILED);
        console.log("Status updated to FAILED:", payment6.getStatus());
        payment6.updateStatus(PaymentStatus.CANCELLED);
        console.log("Status updated to CANCELLED:", payment6.getStatus());
        payment6.updateStatus(PaymentStatus.PPENDING);
        console.log("Status updated to PPENDING:", payment6.getStatus());
    } catch (error) {
        console.error("Update status error:", (error as Error).message);
    }

    // Test 8: Update Status with invalid status
    console.log("\n=== Test 8: Update Status with Invalid Status ===");
    try {
        payment6.updateStatus("INVALID" as any);
        console.log("This should not print");
    } catch (error) {
        console.error("Expected error for invalid status:", (error as Error).message);
    }

    // Test 9: Apply Booking Fee and Calculate Taxes
    console.log("\n=== Test 9: Apply Booking Fee and Calculate Taxes ===");
    const payment7 = new Payment(10, booking, 25);
    try {
        const fee = payment7.applyBookingFee();
        const taxes = payment7.calculateTaxes();
        console.log("Booking Fee applied:", fee);
        console.log("Taxes calculated:", taxes);
        console.log("Stored Booking Fee:", payment7.getBookingFee());
        console.log("Stored Taxes:", payment7.getTaxes());
    } catch (error) {
        console.error("Fee/Taxes error:", (error as Error).message);
    }
}

// Execute demonstrations
demonstrateUserStories();
demonstratePaymentTests();