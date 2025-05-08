import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white mt-16">
      <div className="backdrop-blur-sm bg-black/30">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
          <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <g font-family="Arial, sans-serif" font-size="32" font-weight="bold">
              <text x="50" y="35" fill="#FFFFFF">Instavibe</text>
            </g>
            <rect x="5" y="10" width="30" height="30" rx="5" stroke="#FFFFFF" fill="none" stroke-width="3"/>
            <circle cx="20" cy="25" r="5" fill="#FFFFFF" />
          </svg>

            <p className="text-sm text-gray-200">
              A modern cloud-native platform for sharing photos and videos. Built
              with Next.js and Google Firebase.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white/80 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-white/80 transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/upload" className="hover:text-white/80 transition-colors">
                  Upload
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-white">Creators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/upload" className="hover:text-white/80 transition-colors">
                  Upload Content
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-white/80 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-white/80 transition-colors">
                  Log In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs py-4 border-t border-white/20 mt-4">
          <p className="text-white/80">
            &copy; {new Date().getFullYear()} Instavibe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;