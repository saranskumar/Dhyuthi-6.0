"use client";
import React, { useState } from "react";
import { ArrowRight, Check, QrCode, Smartphone } from "lucide-react";

type RegistrationType = "ieee+society" | "ieee-only" | "non-ieee";

interface FormData {
  name: string;
  phone: string;
  email: string;
  ieeeId?: string;
  college: string;
  year: string;
  department: string;
  foodPreference: "veg" | "non-veg";
  stayNeeded: "yes" | "no";
  registrationType: RegistrationType;
  termsAccepted: boolean;
  paymentScreenshot: File | null;
}

export default function Track1Registration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    ieeeId: "",
    college: "",
    year: "",
    department: "",
    foodPreference: "non-veg",
    stayNeeded: "no",
    registrationType: "non-ieee",
    termsAccepted: false,
    paymentScreenshot: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

  const pricing: Record<RegistrationType, number> = {
    "ieee+society": 299,
    "ieee-only": 399,
    "non-ieee": 499,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, files, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? (files ? files[0] : null) : type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
   const requiredFields = ["name", "phone", "email", "college", "year", "department"];
  for (const field of requiredFields) {
    if (!formData[field as keyof FormData]) {
      alert("Please fill all required fields before proceeding.");
      return;
    }
  }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handlePayNow = () => {
    const amount = pricing[formData.registrationType];
    const note = `TRACK1 Registration - ${formData.name}`;
    const upiLink = `upi://pay?pa=saranskumarwh@oksbi&pn=Saran&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    window.location.href = upiLink;
  };

  const handleSubmit = async () => {
    if (!formData.paymentScreenshot) {
      alert("Please upload payment screenshot");
      return;
    }

    setIsSubmitting(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(formData.paymentScreenshot);
      
      reader.onload = async () => {
        if (!reader.result || typeof reader.result !== 'string') {
          alert("Error reading file. Please try again.");
          setIsSubmitting(false);
          return;
        }

        const base64Image = reader.result.split(',')[1];
        
        const payload = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          ieeeId: formData.ieeeId,
          college: formData.college,
          year: formData.year,
          department: formData.department,
          foodPreference: formData.foodPreference,
          stayNeeded: formData.stayNeeded,
          registrationType: formData.registrationType,
          amount: pricing[formData.registrationType],
          paymentScreenshot: base64Image,
          fileName: formData.paymentScreenshot?.name || 'payment.png',
          timestamp: new Date().toISOString(),
        };

        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        setIsSubmitted(true);
        setIsSubmitting(false);
      };

      reader.onerror = () => {
        alert("Error reading file. Please try again.");
        setIsSubmitting(false);
      };

    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const getQRCodeUrl = () => {
    const amount = pricing[formData.registrationType];
    const note = `TRACK1 Registration by:- ${formData.name}`;
    const upiString = `upi://pay?pa=saranskumarwh@oksbi&pn=Saran&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiString)}`;
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-black/40 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl border border-purple-500/20">
          {isSubmitted ? (
            <div className="text-center text-white">
              <Check className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-3xl font-bold mb-4">Registration Successful!</h2>
              <p className="text-lg mb-2">Thank you for registering for TRACK1.</p>
              <p className="text-purple-200">
                We&apos;ll verify your payment and send confirmation via email within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-6 text-white">
              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 1 ? 'bg-purple-600' : 'bg-green-600'}`}>
                    {step === 1 ? '1' : <Check className="w-6 h-6" />}
                  </div>
                  <div className={`w-20 h-1 ${step === 2 ? 'bg-purple-600' : 'bg-gray-600'}`}></div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 2 ? 'bg-purple-600' : 'bg-gray-600'}`}>
                    2
                  </div>
                </div>
              </div>

              {step === 1 && (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-purple-200 text-center">
                    Registration Details
                  </h2>

                  {/* Personal Details */}
                  <div className="space-y-4">
                    <input
                      name="name"
                      placeholder="Full Name *"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl text-black w-full focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl text-black w-full focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl text-black w-full focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                      <input
                        name="ieeeId"
                        placeholder="IEEE Membership ID"
                        value={formData.ieeeId}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl text-black w-full focus:ring-2 focus:ring-purple-500 outline-none"
                        
                      />
                      <p className="text-sm text-purple-300 mt-1">Optional, only if you have an IEEE ID</p>

                    <input
                      name="college"
                      placeholder="College/University Name *"
                      required
                      value={formData.college}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl text-black w-full focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <select
                        name="year"
                        required
                        value={formData.year}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl text-black w-full focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="">Select Year *</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select>

                      <input
                        name="department"
                        placeholder="Department/Branch *"
                        required
                        value={formData.department}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl text-black w-full focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-purple-200 font-medium">Food Preference *</label>
                        <select
                          name="foodPreference"
                          required
                          value={formData.foodPreference}
                          onChange={handleInputChange}
                          className="px-4 py-3 rounded-xl text-black w-full focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                           <option value="non-veg">Non-Vegetarian</option>
                          <option value="veg">Vegetarian</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-2 text-purple-200 font-medium">Stay Needed? *</label>
                        <select
                          name="stayNeeded"
                          required
                          value={formData.stayNeeded}
                          onChange={handleInputChange}
                          className="px-4 py-3 rounded-xl text-black w-full focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                        </select>
                        <p className="text-sm text-yellow-300 mt-1">⚠️ Extra charges apply for stay. You don’t need to pay now. We will contact you soon after registration.</p>

                      </div>
                    </div>
                  </div>

                  {/* Registration Type */}
                  <div className="mt-8">
                    <label className="block mb-4 text-purple-200 font-medium text-lg">Registration Type *</label>
                    <div className="space-y-3">
                      {(Object.entries(pricing) as [RegistrationType, number][]).map(([type, price]) => (
                        <label
                          key={type}
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all ${
                            formData.registrationType === type
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-purple-500/30 bg-black/20 hover:border-purple-500/50'
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="registrationType"
                              value={type}
                              checked={formData.registrationType === type}
                              onChange={handleInputChange}
                              className="mr-3 w-4 h-4"
                            />
                            <span className="font-medium capitalize">
                              {type === "ieee+society" ? "IEEE Member + Society Member" : 
                               type === "ieee-only" ? "IEEE Member Only" : 
                               "Non-IEEE Member"}
                            </span>
                          </div>
                          <span className="text-xl font-bold text-purple-300">₹{price}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="mt-8 p-6 bg-purple-900/20 rounded-xl border border-purple-500/30">
                    <h3 className="text-xl font-bold mb-4 text-purple-200">Terms & Conditions</h3>
                    <div className="text-sm text-purple-100 space-y-2 max-h-40 overflow-y-auto mb-4">
                      <p>• Registration fees are non-refundable and non-transferable.</p>
                      <p>• Participants must carry a valid college ID during the event.</p>
                      <p>• The organizers reserve the right to modify the schedule or cancel events due to unforeseen circumstances.</p>
                      <p>• Participants are responsible for their own belongings during the event.</p>
                      <p>• By registering, you consent to the use of photographs/videos taken during the event for promotional purposes.</p>
                      <p>• Payment confirmation will be sent via email within 24-48 hours after verification.</p>
                    </div>
                  <label className="flex items-center cursor-pointer mt-4 p-3 rounded-xl bg-purple-900/20 hover:bg-purple-900/30 transition-colors">
  <input
    type="checkbox"
    name="termsAccepted"
    checked={formData.termsAccepted}
    onChange={handleInputChange}
    className="w-6 h-6 text-purple-600 rounded-lg accent-purple-500 outline-none border-none"
  />
  <span className="ml-3 text-sm text-purple-200">
    I have read and agree to the terms and conditions *
  </span>
</label>


                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-purple-200 text-center">
                    Payment Section
                  </h2>

                  <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/30 mb-6">
                    <h3 className="text-xl font-bold mb-2 text-center">Amount to Pay</h3>
                    <p className="text-4xl font-bold text-center text-purple-300">
                      ₹{pricing[formData.registrationType]}
                    </p>
                    <p className="text-center text-purple-200 mt-2 capitalize">
                      {formData.registrationType.replace('-', ' ').replace('+', ' + ')}
                    </p>
                  </div>

                  <div className="text-center mb-6">
                    <p className="mb-4 text-purple-200 text-lg">
                      Choose your payment method:
                    </p>

                    {/* Mobile UPI Payment */}
                    <button
                      type="button"
                      onClick={handlePayNow}
                      className="w-full mb-4 inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <Smartphone className="mr-2 w-6 h-6" />
                      Pay ₹{pricing[formData.registrationType]} with UPI (Mobile)
                    </button>

                    <div className="flex items-center my-6">
                      <div className="flex-1 h-px bg-purple-500/30"></div>
                      <span className="px-4 text-purple-300">OR</span>
                      <div className="flex-1 h-px bg-purple-500/30"></div>
                    </div>

                    {/* QR Code Section */}
                    <button
                      type="button"
                      onClick={() => setShowQR(!showQR)}
                      className="w-full mb-4 inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <QrCode className="mr-2 w-6 h-6" />
                      {showQR ? 'Hide' : 'Show'} QR Code (Desktop/Scan)
                    </button>

                    {showQR && (
                      <div className="mt-6 p-6 bg-white rounded-2xl inline-block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getQRCodeUrl()}
                          alt="Payment QR Code"
                          width={300}
                          height={300}
                          className="w-64 h-64 mx-auto"
                        />
                        <p className="text-black text-sm mt-4 font-medium">
                          Scan with any UPI app to pay ₹{pricing[formData.registrationType]}
                        </p>
                        <p className="text-gray-600 text-xs mt-2">
                          saranskumarwh@oksbi
                        </p>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-900/20 rounded-xl border border-yellow-500/30">
                      <p className="text-yellow-200 text-sm">
                        ⚠️ <strong>Important:</strong> After completing the payment, please upload a screenshot below for verification.
                      </p>
                    </div>
                  </div>

                  {/* Screenshot Upload */}
                  <div className="mt-6">
                    <label className="block mb-3 text-purple-200 font-medium text-lg">
                      Upload Payment Screenshot *
                    </label>
                    <input
                      type="file"
                      name="paymentScreenshot"
                      accept="image/*"
                      required
                      onChange={handleInputChange}
                      className="w-full text-white file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer cursor-pointer"
                    />
                    {formData.paymentScreenshot && (
                      <p className="mt-2 text-sm text-green-400">
                        ✓ {formData.paymentScreenshot.name}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-purple-500/30">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-purple-700/40 px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300"
                  >
                    ← Back
                  </button>
                )}
               <button
                    type="button"
                    onClick={step === 1 ? handleNext : handleSubmit}
                    disabled={step === 1 && !formData.termsAccepted || isSubmitting}
                    className={`ml-auto inline-flex items-center px-8 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg
                      ${step === 1 && !formData.termsAccepted 
                        ? "bg-gray-500 cursor-not-allowed opacity-50 transform-none" 
                        : "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transform hover:scale-105"
                      }`}
                   >
                    {isSubmitting ? "Submitting..." : step === 1 ? "Next: Payment" : "Submit Registration"}
                    {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                  </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}