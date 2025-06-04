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
import { Promotion } from "./models/promotion/Promotion";

// Initialize data
const cinema = new Cinema("CIN001", "City Cinema", "123 Main St");
const movieRoom = new MovieRoom("ROOM001", "Screen 1", cinema);

// Create seats
const seats = [
    new Seat("SEAT001", "A", "1", ZipZone.STANDARD, "10"),
    new Seat("SEAT002", "A", "2", ZipZone.PREMIUN, "15"),
    new Seat("SEAT003", "B", "1", ZipZone.VIP, "20")
];
seats.forEach(seat => movieRoom.addSeat(seat));

// Create movie and showtime
const movie = new Movie("MOV001", "The Adventure", "Action", [], "A thrilling adventure", "120", "2025-06-01");
const showtime = new ShowTime("SHOW001", "2025-06-04T18:00:00", "2025-06-04T20:00:00", 10, movieRoom, movie);
cinema.addShowtime(showtime);
movieRoom.addShowtime(showtime);
movie.addShowTime(showtime);

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

// Create promotion
const promotion = new Promotion(1, "SUMMER25", 10, "Summer discount", true);

// Demonstrate movie booking process
function demonstrateMovieBookingProcess() {
    console.log("\n🎬 Welcome to City Cinema Booking System 🎬");
    console.log("=========================================");

    console.log("\n1. Browsing Movies and Showtimes");
    console.log("--------------------------------");
    try {
        console.log("Available movies in genre 'Action':", movieManager.filterMoviesByGenre("Action").map(m => m.getTitle()).join(", "));
        console.log("Showtimes for 'The Adventure':", movie.getShowTimes().map(s => new Date(s.getStartTime()).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })));
    } catch (error) {
        console.error("Error browsing movies:", (error as Error).message);
    }

    console.log("\n2. Checking Seat Availability");
    console.log("-----------------------------");
    try {
        console.log("Available seats in Screen 1:", movieRoom.getAvailableSeats().map(s => `${s.getSeatId()} (${s.getZipZone()})`).join(", "));
    } catch (error) {
        console.error("Error checking seats:", (error as Error).message);
    }

    console.log("\n3. Booking Tickets with Promotion");
    console.log("---------------------------------");
    let booking;
    try {
        console.log(`User ${soda.getName()} is booking tickets...`);
        const selectedSeats = [seats[0], seats[1]];
        booking = soda.createBooking(showtime, selectedSeats, "Credit Card");
        console.log(`Booking successful! Booking ID: ${booking.getId()}`);
        console.log("Tickets issued:", booking.getTicket().map(t => t.generateQRCode()).join(", "));

        // Display payment details
        const payment = booking.getPayment();
        if (payment) {
            console.log("Payment Summary:");
            console.log(`- Subtotal: $${(payment.getTotal() - payment.getBookingFee() - payment.getTaxes()).toFixed(2)}`);
            console.log(`- Booking Fee: $${payment.getBookingFee().toFixed(2)}`);
            console.log(`- Taxes (5%): $${payment.getTaxes().toFixed(2)}`);
            console.log(`- Total Paid: $${payment.getTotal().toFixed(2)}`);
            console.log(`- Payment Method: ${payment.getPaymentMethod()}`);
            console.log(`- Payment Status: ${payment.getStatus()}`);
        }

        // Send notification
        const notification = new Notifications("NOTIF001", "", "Booking", new Date());
        notification.sendBookingConfirmation(soda, booking);
    } catch (error) {
        console.error("Booking failed:", (error as Error).message);
    }

    console.log("\n4. Viewing Bookings");
    console.log("-------------------");
    try {
        console.log(`${soda.getName()}'s upcoming bookings:`, soda.getBookingHistory().getUpcomingBookings().map(b => b.getId()).join(", ") || "None");
        console.log(`${soda.getName()}'s past bookings:`, soda.getBookingHistory().getPastBookings().map(b => b.getId()).join(", ") || "None");
    } catch (error) {
        console.error("Error viewing bookings:", (error as Error).message);
    }

    console.log("\n5. Validating Ticket at Cinema");
    console.log("-----------------------------");
    try {
        const ticket = booking?.getTicket()[0];
        if (ticket) {
            console.log(`Staff checking QR code: ${ticket.generateQRCode()}`);
            console.log("Ticket validation:", staff.checkQRCode(ticket.generateQRCode()) ? "Valid" : "Invalid");
        } else {
            console.log("No ticket found for validation.");
        }
    } catch (error) {
        console.error("Error validating ticket:", (error as Error).message);
    }

    console.log("\n6. Rating and Reviewing Movie");
    console.log("-----------------------------");
    try {
        const review = new Review(1, showtime.getShowtimeId(), "4.5", "Great movie, action-packed!", soda, movie);
        soda.addReview(review);
        movie.addReview(review);
        console.log(`${soda.getName()} submitted a review for 'The Adventure':`);
        console.log(`- Comment: ${review.getComment()}`);
        console.log(`- Rating: ${review.getRating()} / 5`);
        console.log(`- Movie Average Rating: ${movie.getAverageRating()} / 5`);
    } catch (error) {
        console.error("Error submitting review:", (error as Error).message);
    }

    console.log("\n=========================================");
    console.log("Thank you for using City Cinema Booking System! 🎬");
}

// Execute demonstration
demonstrateMovieBookingProcess();


console.log("Welcome to Cineplex Booking System");


// Initialize Cinema and MovieRoom
const cinema1 = new Cinema("CIN1", "Cinema 1", "123 Main St");
const movieRoom1 = new MovieRoom("ROOM1", "Room A", cinema);
movieRoom.addSeat(new Seat("SEAT1", "A", "1", ZipZone.STANDARD, "10"));
movieRoom.addSeat(new Seat("SEAT2", "A", "2", ZipZone.STANDARD, "10"));

// Initialize MovieManager
const movieManager1 = new MovieManager();

// Add existing movie
const inception = new Movie(
    "MOV1",
    "Inception",
    "Sci-Fi",
    [],
    "A mind-bending thriller",
    "2h 28m",
    "2010-07-16"
);
movieManager.addMovie(inception);

// Add a showtime for Inception
const showtime1 = new ShowTime(
    "SHOW1",
    "2025-06-03T15:00:00",
    "2025-06-03T17:30:00",
    10,
    movieRoom,
    inception
);
inception.addShowTime(showtime);
movieRoom.getShowtimes().push(showtime);
cinema.addShowtime(showtime);

// Add a new movie to trigger notification
const newMovie = new Movie(
    "MOV2",
    "The Matrix",
    "Sci-Fi",
    [],
    "A cyberpunk action film",
    "2h 16m",
    "1999-03-31"
);
movieManager.addMovie(newMovie);

// Filter movies and showtimes
const criteria = {
    genre: "Sci-Fi",
    date: "2025-06-03",
    cinemaId: "CIN1",
    timeRange: { start: "2025-06-03T14:00:00", end: "2025-06-03T20:00:00" }
};

const results = movieManager.filterMoviesAndShowtimes(criteria);
console.log("Filtered Movies and Showtimes:");
results.forEach(({ movie, showtimes }) => {
    console.log(`Movie: ${movie.getTitle()}`);
    showtimes.forEach(showtime => {
        console.log(
            `  Showtime: ${showtime.getShowtimeId()} at ${showtime.getStartTime()} ` +
            `in ${showtime.getMovieRoom().getCinema().getAddress()}`
        );
    });
});
