// "use client";
// import {
//   Show,
//   SignInButton,
//   SignOutButton,
//   SignUpButton,
//   UserButton,
// } from "@clerk/nextjs";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";


// const Navigation = () => {
//   const pathname = usePathname();

//   const navLink = (href, label) => {
//     const isActive = pathname === href;

//     return (
//       <Link
//         href={href}
//         className={`px-3 py-1 rounded-md transition ${
//           isActive
//             ? "bg-gray-400 rounded-2xl text-black font-bold shadow-md"
//             : "hover:bg-gray-400 hover:text-white text-black font-bold"
//         }`}
//       >
//         {label}
//       </Link>
//     );
//   };

//   return (
//     <div>
//       <nav className="fixed top-0 left-0 w-full z-50 bg-gray-300 text-white px-6 py-3 shadow-md">
//         <div className="flex justify-between items-center">
//           {/* Logo / App Name */}
//           <Link href="/" className="text-xl font-bold text-black">
//             CivicPulse
//           </Link>

//           <div className="flex gap-4">
//             <Show when="signed-in">
//               {navLink("/", "Home")}
//               {navLink("/post", "Report")}
//               {navLink("/dashboard", "Dashboard")}
//               {navLink("/mypost", "Posts")}
//             </Show>
//           </div>

//           {/* Auth Buttons */}
//           <div className="flex justify-center items-center space-x-4">
//             <Show when="signed-in">
//               <UserButton />
//               <Link className="font-bold text-black" href="/user-profile">Profile</Link>
//             </Show>
//             <Show when="signed-out">
//               <SignInButton mode="modal" className="bg-black/60 px-3 py-1 rounded-2xl" />
//               <SignUpButton  className="bg-white text-black px-3 py-1 rounded-2xl"/>
//             </Show>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navigation;

"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navigation = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (href, label) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        onClick={() => setMenuOpen(false)} // close menu on click
        className={`block px-3 py-2 rounded-md transition ${
          isActive
            ? "bg-gray-400 text-black font-bold"
            : "hover:bg-gray-400 hover:text-white text-black font-bold"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-14 z-50 bg-gray-300 px-5 py-2 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-lg sm:text-xl font-bold text-black">
          CivicPulse
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <Show when="signed-in">
            {navLink("/", "Home")}
            {navLink("/post", "Report")}
            {navLink("/dashboard", "Dashboard")}
            {navLink("/mypost", "Posts")}
          </Show>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <Show when="signed-in">
            <UserButton />
            <Link className="font-bold text-black" href="/user-profile">
              Profile
            </Link>
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal" />
            <SignUpButton />
          </Show>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 backdrop-blur-2xl rounded-xl shadow-lg p-4 space-y-3">
          <Show when="signed-in">
            {navLink("/", "Home")}
            {navLink("/post", "Report")}
            {navLink("/dashboard", "Dashboard")}
            {navLink("/mypost", "Posts")}

            <div className="flex items-center gap-2 pt-2 border-t">
              <UserButton />
              <Link
                href="/user-profile"
                className="font-bold text-black"
              >
                Profile
              </Link>
            </div>
          </Show>

          <Show when="signed-out">
            <div className="flex flex-col gap-2">
              <SignInButton mode="modal" />
              <SignUpButton />
            </div>
          </Show>
        </div>
      )}
    </nav>
  );
};

export default Navigation;