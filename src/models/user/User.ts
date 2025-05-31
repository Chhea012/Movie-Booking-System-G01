import { Booking } from "../booking/Booking";
import { Review } from "../review/Review";
import { Person } from "./Person";

/**
 * In-memory storage for registered users.
 */
const users: User[] = [];
export class User extends Person {
  constructor(
    name: string,
    email: string,
    phone: string,
    private userId: string,
    private password: string,
    private booking: Booking[] = [],
    private review: Review[] = []
  ) {
    super(name, email, phone);
  }
  /**
   * Registers a new user to the system.
   * Checks for duplicate email and validates inputs before adding.
   */
  public static register(user: User): void {
    // Input validation
    if (!user.getName() || user.getName().trim().length < 2) {
      throw new Error("Name must be at least 2 characters long.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.getEmail() || !emailRegex.test(user.getEmail())) {
      throw new Error("Invalid email format.");
    }

   // Validate phone (as string, 10-12 digits)
    const phoneStr = user.getPhone().replace(/\D/g, ''); // Remove non-digit characters
    if (!user.getPhone() || phoneStr.length < 10 || phoneStr.length > 12) {
      throw new Error("Phone number must be between 10 and 12 digits long.");
    }

    if (!user.userId || user.userId.length < 5) {
      throw new Error("User ID must be at least 5 characters long.");
    }

    if (!user.password || user.password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }

    // Check if email already exists
    const existingEmail = users.find(u => u.getEmail() === user.getEmail());
    if (existingEmail) {
      throw new Error(`Email "${user.getEmail()}" is already registered.`);
    }

    // Check if userId already exists
    const existingUserId = users.find(u => u.userId === user.userId);
    if (existingUserId) {
      throw new Error(`User ID "${user.userId}" is already in use.`);
    }
    // Add new user to in-memory storage
    users.push(user);
    console.log(`User "${user.getName()}" registered successfully.`);
  }
  /**
   * For testing or admin purposes: gets all registered users.
   * @returns Array of registered users.
   */
  public static getAllUsers(): User[] {
    return users;
  }

  // Getter for private properties
  public getuserId(): string {
    return this.userId;
  }

  public getpassword(): string {
    return this.password;
  }
}

