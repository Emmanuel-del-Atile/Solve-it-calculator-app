import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export async function registerUser() {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "boss@test.com",
      "password123"
    );

    const user = userCredential.user;

    console.log("User created!");
    console.log("UID:", user.uid);
    console.log("Email:", user.email);

    return user;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
}

// Function to log in the user
export async function loginUser(
  email: string,
  password: string
) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    console.log("User signed in!");
    console.log("UID:", user.uid);
    console.log("Email:", user.email);

    return user;

  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

// Function to sign out the user
export async function logOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out!");
  } catch (error) {
    console.error("Sign out error:", error);
  }
}