"use client";
import React from "react";

const Header = () => {
  return (
    <nav className="bg-[#070707] py-5 border-b-[1px]">
      <div className="container mx-auto flex flex-row gap-10 justify-center items-center">
        <h1
          onClick={() => (window.location.href = "/")}
          className="text-lg sm:text-xl font-semibold tracking-wide text-white text-shadow-md cursor-pointer animate-pulse "
        >
          Book Your Table
        </h1>
        <h1
          onClick={() => (window.location.href = "/myBookings")}
          className="text-lg sm:text-xl font-semibold tracking-wide text-white text-shadow-md cursor-pointer animate-pulse "
        >
          My Bookings
        </h1>
      </div>
    </nav>
  );
};

export default Header;
