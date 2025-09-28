"use client";

import React, { useState } from "react";
import { CreditCard, ArrowLeft, Check } from "lucide-react";

export default function RegistrationFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ticketType: "standard",
    agreeTerms: false,
    paymentScreenshot: null as File | null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({ ...prev, paymentScreenshot: files?.[0] ?? null }));
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // send formData + screenshot to backend to verify payment
    console.log("Submitting payment + details:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Verified!</h1>
          <p className="text-gray-600 mb-6">Thank you, your registration for TRACK1 is confirmed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Step 1: Registration Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 w-full"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 w-full"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                required
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 w-full"
              />
            </div>
            <label className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                className="w-4 h-4"
              />
              I agree to terms & conditions
            </label>
            <button
              onClick={handleNext}
              disabled={!formData.agreeTerms}
              className="mt-6 bg-purple-700 text-white px-8 py-3 rounded-2xl font-bold hover:bg-purple-800 transition disabled:opacity-50"
            >
              Next: Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Step 2: Payment</h2>
            <p className="mb-4">Scan QR code or use UPI to pay ₹200 for your TRACK1 ticket.</p>

            <div className="flex flex-col items-center mb-6">
              <img src="/track1-payment-qr.png" alt="UPI QR Code" className="w-48 h-48 mb-4" />
              <a
                href="upi://pay?pa=track1@upi&pn=TRACK1&am=200"
                className="text-purple-700 font-semibold hover:underline"
              >
                Pay via UPI
              </a>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Payment Screenshot *</label>
              <input
                type="file"
                name="paymentScreenshot"
                required
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-purple-300 rounded-xl p-3"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                <ArrowLeft className="w-4 h-4 inline mr-2" /> Back
              </button>
              <button
                type="submit"
                className="bg-purple-700 text-white px-8 py-3 rounded-2xl font-bold hover:bg-purple-800 transition"
              >
                Submit Payment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
