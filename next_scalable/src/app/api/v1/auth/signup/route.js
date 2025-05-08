import { NextResponse } from "next/server";
import { auth, db } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request) {
  try {
    const { email, password, username } = await request.json();

    // Validate input
    if (!email || !password || !username) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update profile and send verification
    await Promise.all([
      updateProfile(user, { displayName: username }),
      sendEmailVerification(user),
      setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: username,
        role: "consumer",
        createdAt: serverTimestamp(),
        emailVerified: false,
        lastLogin: serverTimestamp()
      })
    ]);

    return NextResponse.json({
      success: true,
      message: "User created successfully. Verification email sent.",
      data: {
        uid: user.uid,
        email: user.email,
        displayName: username
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle specific Firebase errors
    let errorMessage = "Registration failed";
    let statusCode = 500;

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "Email already in use";
        statusCode = 409;
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email address";
        statusCode = 400;
        break;
      case 'auth/weak-password':
        errorMessage = "Password is too weak";
        statusCode = 400;
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Email/password accounts are not enabled";
        statusCode = 403;
        break;
    }

    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: statusCode }
    );
  }
}
