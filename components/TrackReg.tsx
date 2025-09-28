"use client";
import React from "react";

interface TrackRegProps {
  trackName: string;
}

export default function TrackReg({ trackName }: TrackRegProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">{trackName} Registration</h1>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />
        <input
          type="number"
          placeholder="Phone Number"
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded mt-2">
          Register
        </button>
      </form>
    </div>
  );
}
