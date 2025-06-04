// Import statements remain unchanged
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
movie.addShowTime(showtime);
cinema.addShowtime(showtime);

// Create movie manager
const movieManager = new MovieManager([movie]);

// Create users
const soda = new User("Soda", "soda@gmail.com", "+855978049375", "Soda12", "soda1225");
const giyu = new User("Giyu", "giyu@gmail.com", "+85599861664", "Giyu13", "giyu1225");
const gigi = new User("Gigi", "gig@gmail.com", "+8559981323", "gigi12", "gigi1225");
User.register(soda);
User.register(giyu);
User.register(gigi);

// Create cinema staff
const staff = new CinemaStaff(1, cinema, "John Staff", "john@cinema.com", "+855123456789");
cinema.addCinemaStaff(staff);

// Create promotion
const promotion = new Promotion(1, "SUMMER25", 10, "Summer discount", true);

// Function to display all user information
function displayAllUsers() {
    const users = [soda, giyu, gigi]; // Use User.registeredUsers if implemented

    console.log("\nUser Accounts:");
    console.log("---------------------------");

    users.forEach(user => {
        console.log(`Name: '${user.getName()}'`);
        console.log(`Email: '${user.getEmail()}'`);
        console.log(`Phone: '${user.getPhone()}'`);
        console.log(`Username: '${user.getUsername()}'`);

        const upcoming = user.getBookingHistory()?.getUpcomingBookings() || [];
        const past = user.getBookingHistory()?.getPastBookings() || [];
        const reviews = user.getReviews ? user.getReviews() : [];

        // Format booking info
        const formatBookings = (bookings: any[]) => {
            return bookings.map(b => {
                const showtime = b.getShowtime();
                const movie = showtime?.getMovie();
                if (!showtime || !movie) return "Invalid booking";
                return `'${movie.getTitle()}' on '${new Date(showtime.getStartTime()).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })}'`;
            });
        };

        console.log("Upcoming Bookings:", formatBookings(upcoming));
        console.log("Past Bookings:", formatBookings(past));

        if (reviews.length > 0) {
            console.log("Reviews:", reviews.map(r =>
                `'${r.getMovie()?.getTitle() || "Unknown Movie"}' rated ${r.getRating()} - "${r.getComment()}"`
            ));
        } else {
            console.log("Reviews: []");
        }

        console.log("---------------------------");
    });
}

// Demonstrate movie booking process
function demonstrateMovieBookingProcess() {
    console.log("\n🎬 Welcome to City Cinema Booking System 🎬");
    console.log("=========================================");

    console.log("\n1. Viewing All Users");
    console.log("-------------------");
    try {
        displayAllUsers();
    } catch (error) {
        console.error("Error displaying users:", error instanceof Error ? error.message : "Unknown error");
    }

    console.log("\n2. Browsing Movies and Showtimes");
    console.log("--------------------------------");
    try {
        console.log("Available movies in genre 'Action':", movieManager.filterMoviesByGenre("Action").map(m => m.getTitle()).join(", "));
        console.log("Showtimes for 'The Adventure':", movie.getShowTimes().map(s => new Date(s.getStartTime()).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })));
    } catch (error) {
        console.error("Error browsing movies:", error instanceof Error ? error.message : "Unknown error");
    }

    console.log("\n3. Checking Seat Availability");
    console.log("-----------------------------");
    try {
        console.log("Available seats in Screen 1:", movieRoom.getAvailableSeats().map(s => `${s.getSeatId()} (${s.getZipZone()})`).join(", "));
    } catch (error) {
        console.error("Error checking seats:", error instanceof Error ? error.message : "Unknown error");
    }

    console.log("\n4. Booking Tickets with Promotion");
    console.log("---------------------------------");
    let booking;
    try {
        console.log(`User ${soda.getName()} is booking tickets...`);
        const selectedSeats = [seats[0], seats[1]];
        booking = soda.createBooking(showtime, selectedSeats, "Credit Card");
        console.log(`Booking successful! Booking ID: ${booking.getId()}`);
        console.log("Tickets issued:", booking.getTicket().map(t => t.generateQRCode()).join(", "));

        const payment = booking.getPayment();
        if (payment) {
            console.log("Payment Summary:");
            console.log(`- Subtotal: $${(payment.getTotal() - payment.getBookingFee() - payment.getTaxes()).toFixed(2)}`);
            console.log(`- Booking Fee: $${payment.getBookingFee().toFixed(2)}`);
            console.log(`- Taxes (5%): $${payment.getTaxes().toFixed(2)}`);
            console.log(`- Total Paid: $${payment.getTotal().toFixed(2)}`);
            console.log(`- Payment Method: ${payment.getPaymentMethod()}`);
            console.log(`- Payment Status: ${payment.getStatus()}`);
        } else {
            console.log("No payment details available.");
        }

        const notification = new Notifications("NOTIF001", "Booking Confirmation", "Booking", new Date());
        notification.sendBookingConfirmation(soda, booking);
    } catch (error) {
        console.error("Booking failed:", error instanceof Error ? error.message : "Unknown error");
    }

    console.log("\n5. Viewing Bookings");
    console.log("-------------------");
    try {
        console.log(`${soda.getName()}'s upcoming bookings:`, soda.getBookingHistory()?.getUpcomingBookings().map(b => b.getId()).join(", ") || "None");
        console.log(`${soda.getName()}'s past bookings:`, soda.getBookingHistory()?.getPastBookings().map(b => b.getId()).join(", ") || "None");
    } catch (error) {
        console.error("Error viewing bookings:", error instanceof Error ? error.message : "Unknown error");
    }

    console.log("\n6. Validating Ticket at Cinema");
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
        console.error("Error validating ticket:", error instanceof Error ? error.message : "Unknown error");
    }

    console.log("\n7. Rating and Reviewing Movie");
    console.log("-----------------------------");
    try {
        const review = new Review(1, showtime.getShowtimeId(), "4.5", "Great movie, action-packed!", soda, movie);
        soda.addReview(review);
        movie.addReview(review);
        console.log(`${soda.getName()} submitted a review for 'The Adventure':`);
        console.log(`- Comment: ${review.getComment()}`);
        console.log(`- Rating: ${review.getRating()} / 5`);
        console.log(`- Movie Average Rating: ${movie.getAverageRating() || "Not rated yet"} / 5`);
    } catch (error) {
        console.error("Error submitting review:", error instanceof Error ? error.message : "Unknown error");
    }

    console.log("\n=========================================");
    console.log("Thank you for using City Cinema Booking System! 🎬");
}

// Execute demonstration
demonstrateMovieBookingProcess();

// Initialize Cinema and MovieRoom
const cinema1 = new Cinema("CIN001", "Cinema 1", "123 Main St");
const movieRoom1 = new MovieRoom("ROOM1", "Room A", cinema1);
movieRoom1.addSeat(new Seat("SEAT1", "A", "1", ZipZone.STANDARD, "10"));
movieRoom1.addSeat(new Seat("SEAT2", "A", "2", ZipZone.STANDARD, "10"));

// Initialize MovieManager
const movieManager1 = new MovieManager([]);

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
movieManager1.addMovie(inception);

// Add a showtime for Inception
const showtime1 = new ShowTime(
    "SHOW1",
    "2025-06-03T15:00:00",
    "2025-06-03T17:30:00",
    10,
    movieRoom1,
    inception
);
inception.addShowTime(showtime1);
movieRoom1.addShowtime(showtime1);
cinema1.addShowtime(showtime1);

// Add a new movie
const newMovie = new Movie(
    "MOV2",
    "The Matrix",
    "Sci-Fi",
    [],
    "A cyberpunk action film",
    "2h 16m",
    "1999-03-31"
);
movieManager1.addMovie(newMovie);

// Add a showtime for The Matrix
const matrixShowtime = new ShowTime(
    "SHOW2",
    "2025-06-04T20:00:00",
    "2025-06-04T22:16:00",
    10,
    movieRoom1,
    newMovie
);
newMovie.addShowTime(matrixShowtime);
movieRoom1.addShowtime(matrixShowtime);
cinema1.addShowtime(matrixShowtime);

// Display new movie details
console.log("\nNew Movie Added:");
console.log("----------------");
console.log(`Title: ${newMovie.getTitle()}`);
console.log(`Genre: ${newMovie.getGenre()}`);
console.log(`Description: ${newMovie.getDescription()}`);
console.log(`Duration: ${newMovie.getDuration()}`);
console.log(`Release Date: ${newMovie.getReleaseDate()}`);
console.log(`Showtimes: ${newMovie.getShowTimes().length > 0 ? 
    newMovie.getShowTimes().map(s => new Date(s.getStartTime()).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).join(", ") : 
    "No showtimes scheduled yet"}`);
console.log("----------------");

// Send notification for new movie
const notification = new Notifications("NOTIF002", "New Movie Added", "Movie", new Date());
notification.sendNewMovieNotification([soda, giyu, gigi], newMovie);

// Filter movies and showtimes
const criteria = {
    genre: "Sci-Fi",
    date: "2025-06-03",
    cinemaId: "CIN001",
    timeRange: { start: "2025-06-03T14:00:00", end: "2025-06-03T20:00:00" }
};

console.log("\nWelcome to Cineplex Booking System");
const results = movieManager1.filterMoviesAndShowtimes(criteria);
console.log("Filtered Movies and Showtimes:");
results.forEach(({ movie, showtimes }) => {
    console.log(`Movie: ${movie.getTitle()}`);
    showtimes.forEach(showtime => {
        console.log(
            `  Showtime: ${showtime.getShowtimeId()} at ${new Date(showtime.getStartTime()).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })} ` +
            `in ${showtime.getMovieRoom().getCinema().getAddress()}`
        );
    });
});