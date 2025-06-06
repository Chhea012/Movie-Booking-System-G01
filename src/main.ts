import { User } from "./models/user/User";
import { Movie } from "./models/showtime/Movie";
import { ShowTime } from "./models/showtime/ShowTime";
import { MovieRoom } from "./models/showtime/MovieRoom";
import { Cinema } from "./models/cinema/Cinema";
import { Seat } from "./models/booking/Seat";
import { ZipZone } from "./models/enum/ZipZone";
import { MovieManager } from "./models/showtime/MovieManager";
import { Review } from "./models/review/Review";
import { CinemaStaff } from "./models/cinema/CinemaStaff"; // ✅ Add this import

function setupTestData() {
    try {
        const cinema = new Cinema("CIN-001", "Grand Cinema", "123 Main St");

        const movieRoom = new MovieRoom("ROOM-001", "Room 1", cinema);

        const seats = [
            new Seat("SEAT-001", "A", "1", ZipZone.STANDARD, "10"),
            new Seat("SEAT-002", "A", "2", ZipZone.PREMIUN, "15"), 
            new Seat("SEAT-003", "B", "1", ZipZone.VIP, "20"),
        ];
        seats.forEach(seat => movieRoom.addSeat(seat));

        const movie = new Movie(
            "MOV-001",
            "The Great Adventure",
            "Action",
            [],
            "An epic action-packed adventure.",
            "2h 10m",
            "2025-06-01"
        );

        const showtime = new ShowTime(
            "SHOW-001",
            "2025-06-07T18:00:00Z",
            "2025-06-07T20:10:00Z",
            12,
            movieRoom,
            movie
        );
        movieRoom.addShowtime(showtime);
        movie.addShowTime(showtime);
        cinema.addShowtime(showtime);

        const movieManager = new MovieManager();
        movieManager.addMovie(movie);

        return { cinema, movieRoom, movie, showtime, movieManager, seats };
    } catch (error) {
        console.error("Error in setupTestData:", error);
        throw error;
    }
}

function runTests() {
    let testData;
    try {
        testData = setupTestData();
    } catch {
        console.error("Setup failed, aborting tests.");
        return;
    }

    const { cinema, movieRoom, movie, showtime, movieManager, seats } = testData;

    console.log("=== Starting Test Suite ===");

    // User Story 1
    console.log("\nUser Story 1: Browse and filter movies by genre and showtimes");
    try {
        const filteredMovies = movieManager.filterMoviesAndShowtimes({
            genre: "Action",
            timeRange: {
                start: "2025-06-07T17:00:00Z",
                end: "2025-06-07T21:00:00Z",
            },
            cinemaId: "CIN-001",
        });
        console.log("Filtered movies:", filteredMovies.map(item => ({
            movieTitle: item.movie.getTitle(),
            showtimes: item.showtimes.map(s => s.getShowtimeId()),
        })));
    } catch (error) {
        console.error("Error in filtering movies:", error);
    }

    // User Story 2
    console.log("\nUser Story 2: View seat availability and choose seats");
    try {
        const availableSeats = showtime.getAvailableSeats();
        console.log("Available seats:", availableSeats.map(seat => ({
            seatId: seat.getSeatId(),
            row: seat.getRow(),
            seatNum: seat.getSeatNum(),
            zipZone: seat.getZipZone(),
        })));
    } catch (error) {
        console.error("Error in viewing seat availability:", error);
    }

    // User Story 3
    console.log("\nUser Story 3: Pay for booking and receive a digital ticket");
    let chhea: User;
    let soda: User;
    try {
        // Register Chhea
        chhea = new User(
            "Chhea",
            "chhea@example.com",
            "1234567890",
            "USER-001",
            "securePassword123"
        );
        User.register(chhea);

        // Register Soda
        soda = new User(
            "Soda",
            "soda@example.com",
            "0987654322",
            "USER-002",
            "anotherSecurePass456"
        );
        User.register(soda);

        // Chhea books seats 1 & 2
        const selectedSeatsChhea = [seats[0], seats[1]];
        const bookingChhea = chhea.createBooking(showtime, selectedSeatsChhea, "Credit Card");
        console.log("Chhea's Booking created:", {
            bookingId: bookingChhea.getId(),
            status: bookingChhea.getStatus(),
            tickets: bookingChhea.getTicket().map(ticket => ({
                ticketId: ticket.getTicketId(),
                qrCode: ticket.generateQRCode(),
                seatId: ticket.getSeat().getSeatId(),
            })),
            total: bookingChhea.getPayment()?.getTotal(),
        });

        // Soda books seat 3
        const selectedSeatsSoda = [seats[2]];
        const bookingSoda = soda.createBooking(showtime, selectedSeatsSoda, "Debit Card");
        console.log("Soda's Booking created:", {
            bookingId: bookingSoda.getId(),
            status: bookingSoda.getStatus(),
            tickets: bookingSoda.getTicket().map(ticket => ({
                ticketId: ticket.getTicketId(),
                qrCode: ticket.generateQRCode(),
                seatId: ticket.getSeat().getSeatId(),
            })),
            total: bookingSoda.getPayment()?.getTotal(),
        });
    } catch (error) {
        console.error("Error in booking and payment:", error);
    }

    // User Story 4
    console.log("\nUser Story 4: View upcoming and past bookings");
    try {
        chhea = User.login("chhea@example.com", "securePassword123");
        const bookingHistoryChhea = chhea.getBookingHistory();
        console.log("Chhea's Upcoming bookings:", bookingHistoryChhea.getUpcomingBookings().map(b => b.getId()));
        console.log("Chhea's Past bookings:", bookingHistoryChhea.getPastBookings().map(b => b.getId()));

        soda = User.login("soda@example.com", "anotherSecurePass456");
        const bookingHistorySoda = soda.getBookingHistory();
        console.log("Soda's Upcoming bookings:", bookingHistorySoda.getUpcomingBookings().map(b => b.getId()));
        console.log("Soda's Past bookings:", bookingHistorySoda.getPastBookings().map(b => b.getId()));
    } catch (error) {
        console.error("Error in viewing booking history:", error);
    }

    // User Story 5
    console.log("\nUser Story 5: Cinema staff checks QR code");
    try {
        const staff = new CinemaStaff(1, cinema, "Jane Smith", "jane.smith@example.com", "0987654321");
        chhea = User.login("chhea@example.com", "securePassword123");
        const booking = chhea.getBookingHistory().getBookings()[0];
        const ticket = booking.getTicket()[0];
        const isValidQR = staff.checkQRCode(ticket.generateQRCode());
        console.log("QR code validation:", isValidQR ? "Valid" : "Invalid");
    } catch (error) {
        console.error("Error in QR code validation:", error);
    }

    // User Story 6
    console.log("\nUser Story 6: Rate and review movie experience");
    try {
        chhea = User.login("chhea@example.com", "securePassword123");
        const review = new Review(
            1,
            showtime.getShowtimeId(),
            "4.5",
            "Great movie, loved the action scenes!",
            chhea,
            movie
        );
        chhea.addReview(review);
        movie.addReview(review);
        console.log("Review added:", {
            reviewId: review.getReviewId(),
            rating: review.getRating(),
            comment: review.getComment(),
            movieTitle: review.getMovie().getTitle(),
        });
        console.log("Movie average rating:", movie.getAverageRating());
    } catch (error) {
        console.error("Error in adding review:", error);
    }

    console.log("\n=== Test Suite Completed ===");
}

try {
    runTests();
} catch (error) {
    console.error("Critical error in test suite:", error);
}
