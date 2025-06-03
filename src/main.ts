
import { Cinema } from "./models/cinema/Cinema";
import { User } from "./models/user/User";
import { ShowTime } from "./models/showtime/ShowTime";
import { Seat } from "./models/booking/Seat";
import { ZipZone } from "./models/enum/ZipZone";
import { Promotion } from "./models/promotion/Promotion";
import { Movie } from "./models/showtime/Movie";
import { MovieRoom } from "./models/showtime/MovieRoom";
import { Payment } from "./models/booking/Payment";
import { PaymentStatus } from "./models/enum/PaymentStatus";
import { BookingHistory } from "./models/booking/BookingHistory";

// ─── SETUP USERS ───────────────────────────────────────────────────────────────

// Create a new user and register them
const giyu = new User(
  "giyu",
  "giyu@gmail.com",
  "+855 978049375",
  "giyu12",
  "giyu1225"
);
User.register(giyu);
console.log("✅ Registered users:", User.getAllUsers().map(u => u.getName()));

// Log in as that user
const loggedInUser = User.login("giyu@gmail.com", "giyu1225");
console.log("✅ Logged in user:", loggedInUser.getName());

// Create a BookingHistory object for this user
const bookingHistory = new BookingHistory("BH001", loggedInUser.getuserId());

//
// ─── SETUP CINEMA, MOVIE ROOM, AND MOVIE ────────────────────────────────────────
//

// 1) Create a Cinema
const cinema = new Cinema("Alias1", "Cinema 1", "C001");

// 2) Create two Seat instances up front (S1 and S2)
const seatA = new Seat("S1", "A", "1", ZipZone.STANDARD, "10");
const seatB = new Seat("S2", "A", "2", ZipZone.STANDARD, "10");

// 3) Create a MovieRoom that contains BOTH seatA and seatB
const movieRoom = new MovieRoom(
  "MR001",
  "Room 1",
  cinema,
  [seatA, seatB], // <-- pass both seats here
  []
);

// 4) Create a Movie
const movie = new Movie(
  "M001",
  "Test Movie",
  "Action",
  [],
  "A thrilling action film",
  "120",
  "2025-01-01",
  []
);

//
// ─── UPCOMING SHOWTIME & BOOKING ────────────────────────────────────────────────
//

// Define an upcoming ShowTime that uses our movieRoom
const upcomingShowtime = new ShowTime(
  "SHOW-UPCOMING",
  "2025-06-02T10:00:00",
  "2025-06-02T12:00:00",
  10,
  movieRoom,
  movie
);

// When booking, reuse the exact same `seatA` that we passed into movieRoom
const upcomingBooking = loggedInUser.createBooking(
  upcomingShowtime,
  [seatA],         // <-- reuse seatA, do NOT do `new Seat("S1", …)` here
  "Credit Card"
);
bookingHistory.addBooking(upcomingBooking);
console.log(
  "✅ Upcoming booking created and added to history:",
  upcomingBooking.getId()
);

//
// ─── PAST SHOWTIME & BOOKING ───────────────────────────────────────────────────
//

// Define a past ShowTime (any date in the past)
const pastShowtime = new ShowTime(
  "SHOW-PAST",
  "2024-05-01T10:00:00",
  "2024-05-01T12:00:00",
  10,
  movieRoom,
  movie
);

// Reuse seatB for the past‐booking
const pastBooking = loggedInUser.createBooking(
  pastShowtime,
  [seatB],         // <-- reuse seatB, do NOT do `new Seat("S2", …)` here
  "Credit Card"
);
bookingHistory.addBooking(pastBooking);
console.log(
  "✅ Past booking created and added to history:",
  pastBooking.getId()
);

//
// ─── PAYMENT TEST ───────────────────────────────────────────────────────────────
//

const payment = new Payment(
  1,
  upcomingBooking,
  10,
  0,
  0,
  "Credit Card",
  PaymentStatus.PPENDING
);

// Process payment for the upcoming booking
payment.processPayment(10, "Credit Card");
console.log("✅ Payment processed - Status:", payment.getStatus());

// Mark payment as completed
payment.updateStatus(PaymentStatus.COMPLETE);
console.log("✅ Payment completed - Status:", payment.getStatus());

// Now cancel the upcoming booking and refund
upcomingBooking.cancelBooking();
payment.refundPayment();
console.log("✅ Payment refunded - Status:", payment.getStatus());

//
// ─── PROMOTION TEST ────────────────────────────────────────────────────────────
//

const promotion = new Promotion(
  1,
  "MOVIE10",
  10,
  "10% off action movies",
  true
);
console.log("✅ Promotion discount on 100:", promotion.applyDiscount(100));
console.log("✅ Promotion code valid:", promotion.validateCode("MOVIE10"));

//
// ─── BOOKING HISTORY: VIEW UPCOMING & PAST BOOKINGS ─────────────────────────────
//

console.log(
  "✅ Upcoming bookings:",
  bookingHistory.getUpcomingBookings().map(b => b.getId())
);
console.log(
  "✅ Past bookings:",
  bookingHistory.getPastBookings().map(b => b.getId())
);

//
// ─── BOOKING HISTORY: ADD & VIEW ENTRY LOG ──────────────────────────────────────
//

// Add some history‐entries
bookingHistory.addEntry("User booked a ticket for Test Movie");
bookingHistory.addEntry("User cancelled booking");
console.log("✅ History entries:", bookingHistory.getEntries());

// Update booking status in history for the upcoming booking
bookingHistory.updateBookingStatus(upcomingBooking.getId(), "COMPLETED");
console.log(
  `✅ Updated booking status to 'COMPLETED' for booking: ${upcomingBooking.getId()}`
);
