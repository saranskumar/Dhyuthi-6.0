"use client";
import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Track1Registration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    city: "",
    paymentScreenshot: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files![0] : value,
    }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration + Payment Data:", formData);
    setIsSubmitted(true);
  };

  return (
    <div
      id="registration-section"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="bg-black/40 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-purple-500/20">
        {isSubmitted ? (
          <div className="text-center text-white">
            <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-3xl font-bold mb-2">
              Registration Successful!
            </h2>
            <p className="mb-4">
              Thank you for registering for TRACK1. We'll verify your payment
              and send confirmation via email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 text-white">
            {step === 1 && (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  Step 1: Personal Details
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl text-black w-full"
                  />
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl text-black w-full"
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl text-black w-full"
                  />
                  <input
                    name="phone"
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl text-black w-full"
                  />
                  <input
                    name="company"
                    placeholder="Company / Organization"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl text-black w-full"
                  />
                  <input
                    name="jobTitle"
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl text-black w-full"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-3xl font-bold mb-6">Step 2: Payment</h2>
                <div className="text-center mb-6">
                  <p className="mb-4 text-purple-200">
                    Please make the payment manually using the QR code below.
                    <br />
                    After paying, upload the payment screenshot for verification.
                  </p>
                  <img
                    src="/placeholder-qr.png"
                    alt="Payment QR Code"
                    className="mx-auto w-64 h-64 border-2 border-purple-500 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-purple-200 font-medium">
                    Upload Payment Screenshot
                  </label>
                  <input
                    type="file"
                    name="paymentScreenshot"
                    accept="image/*"
                    required
                    onChange={handleInputChange}
                    className="px-4 py-2 rounded-xl w-full text-black"
                  />
                </div>
              </>
            )}

            <div className="flex justify-between mt-6">
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-purple-700/40 px-6 py-3 rounded-xl font-semibold hover:bg-purple-700"
                >
                  Back
                </button>
              )}
              <button
                type={step === 1 ? "button" : "submit"}
                onClick={step === 1 ? handleNext : undefined}
                className="ml-auto bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-3 rounded-2xl font-bold hover:from-purple-700 hover:to-purple-900"
              >
                {step === 1 ? "Next: Payment" : "Submit Registration"}
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
