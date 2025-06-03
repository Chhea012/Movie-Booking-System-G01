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
User.register(soda);
User.register(giyu);

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

// Execute demonstration
demonstrateUserStories();
