import { Promotion } from "./models/promotion/Promotion";
import { User } from "./models/user/User";


let soda = new User(
    "Soda",
    "soda@gmail.com",
    "+855 978049375",
    "Soda12",
    "soda1225"
)
let giyu = new User(
    "giyu",
    "giyu@gmail.com",
    "+855 99861664",
    "giyu13",
    "giyu1225"
)

//register the new user
User.register(soda);
User.register(giyu)

// Access getters correctly
console.log("User ID:", soda.getuserId()); // 
console.log("Password:", soda.getpassword()); 
console.log("User ID:", giyu.getuserId()); // 
console.log("Password:", giyu.getpassword()); 

// View all registered users
console.log(User.getAllUsers());



//test for promotion
const promotion = new Promotion(1, "MOVIE10", 10, "10% off action movies", true);
console.log(promotion.applyDiscount(100)); // Outputs 90
console.log(promotion.validateCode("MOVIE10")); // Outputs true