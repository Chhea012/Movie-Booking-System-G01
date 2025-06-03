import { Booking } from "./models/booking/Booking";
import { BookingHistory } from "./models/booking/BookingHistory";
import { Seat } from "./models/booking/Seat";
import { Cinema } from "./models/cinema/Cinema";
import { CinemaStaff } from "./models/cinema/CinemaStaff";
import { BookinStatus } from "./models/enum/BookingStatus";
import { ZipZone } from "./models/enum/ZipZone";
import { Review } from "./models/review/Review";
import { Movie } from "./models/showtime/Movie";
import { MovieManager } from "./models/showtime/MovieManager";
import { MovieRoom } from "./models/showtime/MovieRoom";
import { ShowTime } from "./models/showtime/ShowTime";
import { User } from "./models/user/User";

// Welcome message
console.log("Welcome to Cineplex Booking System");
console.log("");

// Register a new user
const user = new User("Alice Smith", "alice@example.com", "0987654321", "alice123", "password123");
User.register(user);
console.log("Registration successful. Welcome, Alice Smith!");
console.log("");

// Log in the user
const loggedInUser = User.login("alice@example.com", "password123");
console.log("Login successful. Hello, Alice!");
console.log("");

// Browse and filter movies
const movieManager = new MovieManager();
const movie1 = new Movie("MOV1", "Inception", "Sci-Fi", [], "A mind-bending thriller", "2h 28m", "2010-07-16");
const movie2 = new Movie("MOV2", "The Dark Knight", "Action", [], "A superhero epic", "2h 32m", "2008-07-18");
movieManager.addMovie(movie1);
movieManager.addMovie(movie2);
const sciFiMovies = movieManager.filterMoviesByGenre("Sci-Fi");
console.log("Available Sci-Fi Movies:", sciFiMovies.map(m => m.getTitle()).join(", "));


// Set up movie room and showtime
const movieRoom = new MovieRoom("ROOM1", "Room A", new Cinema("CIN1", "Cinema 1", "123 Main St"));
const seat1 = new Seat("SEAT1", "A", "1", ZipZone.STANDARD, "10", movieRoom);
const seat2 = new Seat("SEAT2", "A", "2", ZipZone.STANDARD, "10", movieRoom);
movieRoom.addSeat(seat1);
movieRoom.addSeat(seat2);
const showtime1 = new ShowTime("SHOW1", "2025-06-03T18:00:00+07", "2025-06-03T20:30:00+07", 10, movieRoom, movie1);
movie1.addShowTime(showtime1);

// View seat availability and select a seat
const availableSeats = showtime1.getAvailableSeats();
console.log("Available seats for Inception at 6:00 PM:", availableSeats.map(s => `${s.getRow()}${s.getSeatNum()}`).join(", "));
const selectedSeat = availableSeats[0];
console.log("Selected seat:", `${selectedSeat.getRow()}${selectedSeat.getSeatNum()}`);
console.log("");

// Create a booking and get a ticket
const booking = loggedInUser.createBooking(showtime1, [selectedSeat], "Credit Card");
console.log("Booking confirmed. Your booking ID is:", booking.getId());
const ticket = booking.generateTicket(selectedSeat);
console.log("Your digital ticket QR code:", ticket.generateQRCode());
console.log("");
loggedInUser.addBooking(booking);

// View booking history
const bookingHistory = new BookingHistory("HIST1", loggedInUser.getuserId());
bookingHistory.addBooking(booking);
const upcomingBookings = bookingHistory.getUpcomingBookings();
console.log("Upcoming bookings:", upcomingBookings.length > 0 ? upcomingBookings.map(b => b.getId()).join(", ") : "None");
const pastBooking = new Booking("BOOK2", loggedInUser.getuserId(), "SHOW3", [], [], null, new BookingHistory("HIST2", loggedInUser.getuserId()));
pastBooking.setStatus(BookinStatus.CONFIRMED);
pastBooking.setDate(new Date("2025-06-02T18:00:00+07"));
bookingHistory.addBooking(pastBooking);
const pastBookings = bookingHistory.getPastBookings();
console.log("Past bookings:", pastBookings.length > 0 ? pastBookings.map(b => b.getId()).join(", ") : "None");
console.log("");

// Validate ticket by staff
const staff = new CinemaStaff(1, new Cinema("CIN1", "Cinema 1", "123 Main St"), "Bob Jones", "bob@cinema.com", "0123456789");
const isValid = staff.checkQRCode(ticket.generateQRCode());
console.log("Ticket validation result:", isValid ? "Valid ticket" : "Invalid ticket");
console.log("");


// Add a review
const review = new Review(1, showtime1.getShowtimeId(), "4.5", "Great movie with an amazing plot!", loggedInUser, movie1);
movie1.addReview(review);
const averageRating = movie1.getAverageRating();
console.log("Movie rating updated. Average rating for Inception:", averageRating);
console.log("Your review:", review.getComment());
console.log("");

// Farewell message
console.log("Thank you for using Cineplex Booking System. Enjoy your movie!");
console.log(""); 

