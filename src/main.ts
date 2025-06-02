import { Cinema } from "./models/cinema/Cinema"; 
import { User } from "./models/user/User";
import { ShowTime } from "./models/showtime/ShowTime";
import { Seat } from "./models/booking/Seat";
import { ZipZone } from "./models/enum/ZipZone";
import { Promotion } from "./models/promotion/Promotion";
import { Movie } from "./models/showtime/Movie";
import { MovieRoom } from "./models/showtime/MovieRoom";

// Test registration
const giyu = new User(
    "giyu",                    // name
    "giyu@gmail.com",          // email
    "+855 978049375",          // phone
    "giyu12",                  // userId
    "giyu1225"                 // password
);
User.register(giyu);
console.log("Registered users:", User.getAllUsers().map(u => u.getName()));

// Test login
const loggedInUser = User.login("giyu@gmail.com", "giyu1225");
console.log("Logged in user:", loggedInUser.getName());

// Test createBooking
const cinema = new Cinema(
    "Alias1",                  // alias
    "Cinema 1",                // name
    "C001",                    // cinemaId  
);

const movieRoom = new MovieRoom(
    "MR001",                   // id
    "Room 1",                  // name
    cinema,                    // cinema 
    [new Seat("S1", "A", "1", ZipZone.STANDARD, "10")], // seats
    []                         // showtime 
);

const movie = new Movie(
    "M001",                    // idMovie
    "Test Movie",              // title
    "Action",                  // genre
    [],                        // review
    "A thrilling action film", // description
    "120",                     // duration
    "2025-01-01",              // releaseDate
    []                         // showtime 
);

const showtime = new ShowTime(
    "SHOW1",
    "2025-06-02T10:00:00",
    "2025-06-02T12:00:00",
    10,
    movieRoom,
    movie
);

const seat = new Seat(
    "S1",
    "A",
    "1",
    ZipZone.STANDARD,
    "10"
);

const booking = giyu.createBooking(showtime, [seat], "Credit Card");
console.log("Booking created with ID:", booking.getId());
console.log("Booking seats:", booking.getSeats().map(s => s.getSeatId()));
console.log("Booking payment method:", booking.getPayment()?.getPaymentMethod());

// Test Promotion
const promotion = new Promotion(1, "MOVIE10", 10, "10% off action movies", true);
console.log("Promotion discount (amount 100):", promotion.applyDiscount(100)); 
console.log("Promotion code validation (MOVIE10):", promotion.validateCode("MOVIE10")); 