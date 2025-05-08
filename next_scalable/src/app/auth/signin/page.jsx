"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error("Your email is not verified. Please check your inbox.");
        setUnverifiedUser(user);
        await signOut(auth);
        return;
      }

      toast.success("Login successful!");
      router.push("/media");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (unverifiedUser) {
      try {
        await sendEmailVerification(unverifiedUser);
        toast.success("Verification email sent. Please check your inbox.");
        setUnverifiedUser(null);
      } catch (err) {
        console.error("Failed to send verification email:", err);
        toast.error("Failed to resend verification email.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 main-signIn">
      <div className="w-full max-w-md bg-[#ffffff7d] dark:bg-white p-8 rounded-[20px] shadow border-1 border-[#f5f5f5]">
        <div className="flex items-center justify-center mb-3">
        { 
          <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#833AB4"/>
                    <stop offset="25%" stop-color="#C13584"/>
                    <stop offset="50%" stop-color="#E1306C"/>
                    <stop offset="75%" stop-color="#FD1D1D"/>
                    <stop offset="100%" stop-color="#FCAF45"/>
                  </linearGradient>
                </defs>
                <g font-family="Arial, sans-serif" font-size="32" font-weight="bold">
                  <text x="50" y="35" fill="url(#instaGradient)">Instavibe</text>
                </g>
                <rect x="5" y="10" width="30" height="30" rx="5" stroke="url(#instaGradient)" fill="none" stroke-width="3"/>
                <circle cx="20" cy="25" r="5" fill="url(#instaGradient)" />
          </svg>
        }
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-[10px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-[10px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              "Login"
            )}
          </button>

          {unverifiedUser && (
            <button
              onClick={handleResendVerification}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded mt-2"
            >
              Resend Verification Email
            </button>
          )}

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
