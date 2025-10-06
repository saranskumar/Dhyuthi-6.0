"use client";
import React from "react";
import { CalendarX } from "lucide-react";


// ============================================
// CONFIGURATION
// ============================================
const TRACK_NAME = "Incepta";
// ============================================


export default function Track1Registration() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-black/40 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl border border-purple-500/20 text-center text-white">
          
          {/* Icon and Header */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <CalendarX className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-red-400">
            Registrations Are Now Closed
          </h2>
          
          {/* Message Body */}
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg text-purple-200">
              We are no longer accepting new registrations for the{" "}
              <strong className="text-purple-300">{TRACK_NAME}</strong> event.
            </p>
            <p className="text-purple-300 mt-4">
              Thank you for your overwhelming interest. We look forward to seeing you at our future events!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}