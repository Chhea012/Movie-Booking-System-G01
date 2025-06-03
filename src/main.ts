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

// Step 1: Welcome
console.log("🎬 Welcome to Cineplex Booking System!");
console.log("");

// Step 2: Register user
const newUser = new User("Alice Smith", "alice@example.com", "0987654321", "alice123", "password123");
User.register(newUser);
console.log("✅ Alice registered successfully.");
console.log("");

// Step 3: Login
const currentUser = User.login("alice@example.com", "password123");
console.log("✅ Alice logged in successfully.");
console.log("");

// Step 4: Show available movies
const manager = new MovieManager();
const inception = new Movie("MOV1", "Inception", "Sci-Fi", [], "A mind-bending thriller", "2h 28m", "2010-07-16");
const batman = new Movie("MOV2", "The Dark Knight", "Action", [], "A superhero epic", "2h 32m", "2008-07-18");
manager.addMovie(inception);
manager.addMovie(batman);

const sciFiList = manager.filterMoviesByGenre("Sci-Fi");
console.log("🎥 Sci-Fi Movies:", sciFiList.map(m => m.getTitle()).join(", "));
console.log("");

// Step 5: Set up room and showtime
const cinema = new Cinema("CIN1", "Cinema 1", "123 Main St");
const room = new MovieRoom("ROOM1", "Room A", cinema);
const seatA1 = new Seat("SEAT1", "A", "1", ZipZone.STANDARD, "10", room);
const seatA2 = new Seat("SEAT2", "A", "2", ZipZone.STANDARD, "10", room);
room.addSeat(seatA1);
room.addSeat(seatA2);

const showtime = new ShowTime("SHOW1", "2025-06-03T18:00:00+07", "2025-06-03T20:30:00+07", 10, room, inception);
inception.addShowTime(showtime);

// Step 6: Pick a seat
const freeSeats = showtime.getAvailableSeats();
console.log("🪑 Available seats for Inception at 6:00 PM:", freeSeats.map(s => `${s.getRow()}${s.getSeatNum()}`).join(", "));
const chosenSeat = freeSeats[0];
console.log("✅ Seat selected:", `${chosenSeat.getRow()}${chosenSeat.getSeatNum()}`);
console.log("");

// Step 7: Book the ticket
const newBooking = currentUser.createBooking(showtime, [chosenSeat], "Credit Card");
console.log("📘 Booking confirmed. ID:", newBooking.getId());

const ticket = newBooking.generateTicket(chosenSeat);
console.log("🎫 QR Code Ticket:", ticket.generateQRCode());
console.log("");

// Step 8: Save booking
currentUser.addBooking(newBooking);

// Step 9: View bookings
const history = new BookingHistory("HIST1", currentUser.getuserId());
history.addBooking(newBooking);

const futureBookings = history.getUpcomingBookings();
console.log("📅 Upcoming bookings:", futureBookings.length > 0 ? futureBookings.map(b => b.getId()).join(", ") : "None");

const oldBooking = new Booking("BOOK2", currentUser.getuserId(), "SHOW3", [], [], null, new BookingHistory("HIST2", currentUser.getuserId()));
oldBooking.setStatus(BookinStatus.CONFIRMED);
oldBooking.setDate(new Date("2025-06-02T18:00:00+07"));
history.addBooking(oldBooking);

const pastBookings = history.getPastBookings();
console.log("📜 Past bookings:", pastBookings.length > 0 ? pastBookings.map(b => b.getId()).join(", ") : "None");
console.log("");

// Step 10: Staff scans ticket
const staffMember = new CinemaStaff(1, cinema, "Bob Jones", "bob@cinema.com", "0123456789");
const scanResult = staffMember.checkQRCode(ticket.generateQRCode());
console.log("🔍 Ticket validation result:", scanResult ? "✅ Valid ticket" : "❌ Invalid ticket");
console.log("");

// Step 11: Add a review
const review = new Review(1, showtime.getShowtimeId(), "4.5", "Great movie with an amazing plot!", currentUser, inception);
inception.addReview(review);
console.log("⭐ Movie rating updated. Inception average rating:", inception.getAverageRating());
console.log("💬 Your review:", review.getComment());
console.log("");

// Step 12: Goodbye
console.log("🍿 Thank you for using Cineplex Booking System. Enjoy your movie!");
