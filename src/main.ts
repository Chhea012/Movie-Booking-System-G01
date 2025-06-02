import { User } from "./models/user/User";

let soda = new User(
    "giyu",
    "giyu@gmail.com",
    "+855 978049375",
    "giyu12",
    "giyu1225"
)
User.register(soda);
console.log(User.getAllUsers());

User.login("soda@gmail.com","soda1225")
console.log("Logged in user :", soda.getName());




