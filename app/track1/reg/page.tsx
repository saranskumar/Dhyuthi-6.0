"use client";
import React, { useState } from "react";
import { ArrowRight, Check, QrCode, Smartphone } from "lucide-react";


// ============================================
// CONFIGURATION - Change these for different tracks
// ============================================
const TRACK_NAME = "Aigenix";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpNNl-iDpBDb3hRlBCb-MyFDrkzXnmZBRCKWtaZ9T6W22DHDIyHCIapqm8q8a5BHMvLQ/exec";
const UPI_ID = "athulchacko2017-3@okicici";
const UPI_NAME = "Athul Chacko";
// Pricing configuration
const PRICING = {
  firstyr: 899,
  ieeeOnly: 799,
  nonIeee: 1099,
};
// ============================================

type RegistrationType = "firstyr" | "ieeeOnly" | "nonIeee";

interface FormData {
  name: string;
  phone: string;
  email: string;
  ieeeId: string;
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
    registrationType: "nonIeee",
    termsAccepted: false,
    paymentScreenshot: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files, checked } = e.target as HTMLInputElement;

    setFormData(prev => ({
      ...prev,
      [name]:
        type === "file"
          ? (files ? files[0] : null)
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  const hasIEEEId = formData.ieeeId.trim() !== "";

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

    // IEEE ID validation - only for IEEE Only option
    if (formData.registrationType === "ieeeOnly" && !formData.ieeeId.trim()) {
      alert("Please enter your IEEE Membership ID for IEEE Member pricing.");
      return;
    }

    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handlePayNow = () => {
    const amount = PRICING[formData.registrationType];
    const note = `${TRACK_NAME} Registration - ${formData.name}`;
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    window.location.href = upiLink;
  };

  const handleSubmit = async () => {
    if (!formData.paymentScreenshot) {
      alert("Please upload payment screenshot");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const reader = new FileReader();
      
      // Simulate progress during file reading
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      reader.readAsDataURL(formData.paymentScreenshot);
      
      reader.onload = async () => {
        clearInterval(progressInterval);
        if (!reader.result || typeof reader.result !== 'string') {
          alert("Error reading file. Please try again.");
          setIsSubmitting(false);
          return;
        }

        const base64Image = reader.result.split(',')[1];
        
        const payload = {
          trackName: TRACK_NAME,
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
          amount: PRICING[formData.registrationType],
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

        setUploadProgress(100);
        setTimeout(() => {
          setIsSubmitted(true);
          setIsSubmitting(false);
        }, 500);
      };

      reader.onerror = () => {
        clearInterval(progressInterval);
        alert("Error reading file. Please try again.");
        setIsSubmitting(false);
        setUploadProgress(0);
      };

    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const getQRCodeUrl = () => {
    const amount = PRICING[formData.registrationType];
    const note = `${TRACK_NAME} Registration by:- ${formData.name}`;
    const upiString = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiString)}`;
  };

  const getRegistrationTypeLabel = (type: RegistrationType) => {
    switch (type) {
      case "firstyr":
        return "First Years";
      case "ieeeOnly":
        return "IEEE Member Only";
      case "nonIeee":
        return "Non-IEEE Member";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-black/40 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl border border-purple-500/20">
          {isSubmitting ? (
            <div className="text-center text-white py-12">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                  <div 
                    className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"
                    style={{ animationDuration: '1s' }}
                  ></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Uploading Payment Screenshot...</h2>
              <div className="max-w-md mx-auto">
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-700 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-purple-300 text-sm">{uploadProgress}% Complete</p>
              </div>
              <p className="text-purple-200 mt-4">Please wait while we process your registration...</p>
            </div>
          ) : isSubmitted ? (
            <div className="text-center text-white py-12">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-green-400">Registration Successful!</h2>
              <div className="max-w-2xl mx-auto space-y-4 text-left bg-purple-900/20 p-6 rounded-xl border border-purple-500/30 mb-6">
                <p className="text-lg text-center mb-4">Thank you for registering for {TRACK_NAME}, <strong className="text-purple-300">{formData.name}</strong>!</p>
                
                <div className="space-y-2 text-purple-200">
                  <p className="flex justify-between border-b border-purple-500/20 pb-2">
                    <span className="text-purple-400">Registration Type:</span>
                    <span className="font-semibold">{getRegistrationTypeLabel(formData.registrationType)}</span>
                  </p>
                  <p className="flex justify-between border-b border-purple-500/20 pb-2">
                    <span className="text-purple-400">Amount Paid:</span>
                    <span className="font-semibold text-green-400">₹{PRICING[formData.registrationType]}</span>
                  </p>
                  <p className="flex justify-between border-b border-purple-500/20 pb-2">
                    <span className="text-purple-400">Email:</span>
                    <span className="font-semibold">{formData.email}</span>
                  </p>
                  <p className="flex justify-between border-b border-purple-500/20 pb-2">
                    <span className="text-purple-400">Phone:</span>
                    <span className="font-semibold">{formData.phone}</span>
                  </p>
                  <p className="flex justify-between border-b border-purple-500/20 pb-2">
                    <span className="text-purple-400">College:</span>
                    <span className="font-semibold">{formData.college}</span>
                  </p>
                  <p className="flex justify-between pb-2">
                    <span className="text-purple-400">Year & Department:</span>
                    <span className="font-semibold">{formData.year}, {formData.department}</span>
                  </p>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30 mb-6">
                <p className="text-green-300 font-medium">
                  ✓ Payment screenshot received
                </p>
              </div>

              <div className="bg-yellow-900/20 p-4 rounded-xl border border-yellow-500/30">
                <p className="text-yellow-200">
                  <strong>Next Steps:</strong><br/>
                  We&apos;ll verify your payment and send confirmation via email within 24-48 hours.<br/>
                  Please check your inbox (and spam folder) for updates.
                </p>
              </div>
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
                        <p className="text-sm text-yellow-300 mt-1">⚠️ Accommodation charges are extra. Payment is not required now; we will contact you after registration.</p>
                      </div>
                    </div>
                  </div>

                  {/* Registration Type */}
                  <div className="mt-8">
                    <div className="space-y-3">
                      {/* Non-IEEE - Always enabled */}
                      <label
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          formData.registrationType === "nonIeee"
                            ? "border-purple-500 bg-purple-500/20"
                            : "border-purple-500/30 bg-black/20 hover:border-purple-500/50"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="registrationType"
                            value="nonIeee"
                            checked={formData.registrationType === "nonIeee"}
                            onChange={handleInputChange}
                            className="mr-3 w-4 h-4"
                          />
                          <span className="font-medium">Non-IEEE Member</span>
                        </div>
                        <span className="text-xl font-bold text-purple-300">₹{PRICING.nonIeee}</span>
                      </label>

                      {/* First Year - Always enabled */}
                      <label
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          formData.registrationType === "firstyr"
                            ? "border-purple-500 bg-purple-500/20"
                            : "border-purple-500/30 bg-black/20 hover:border-purple-500/50"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="registrationType"
                            value="firstyr"
                            checked={formData.registrationType === "firstyr"}
                            onChange={handleInputChange}
                            className="mr-3 w-4 h-4"
                          />
                          <span className="font-medium">First Years</span>
                        </div>
                        <span className="text-xl font-bold text-purple-300">₹{PRICING.firstyr}</span>
                      </label>

                      {/* IEEE Only - Enabled only if IEEE ID is entered */}
                      <label
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                          !hasIEEEId
                            ? "opacity-50 cursor-not-allowed border-gray-500/30"
                            : formData.registrationType === "ieeeOnly"
                              ? "border-purple-500 bg-purple-500/20 cursor-pointer"
                              : "border-purple-500/30 bg-black/20 hover:border-purple-500/50 cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="registrationType"
                            value="ieeeOnly"
                            checked={formData.registrationType === "ieeeOnly"}
                            onChange={handleInputChange}
                            className="mr-3 w-4 h-4"
                            disabled={!hasIEEEId}
                          />
                          <span className="font-medium">IEEE Member Only</span>
                        </div>
                        <span className="text-xl font-bold text-purple-300">₹{PRICING.ieeeOnly}</span>
                      </label>

                      {!hasIEEEId && (
                        <p className="text-sm text-yellow-300 mt-2">
                          💡 Enter your IEEE Membership ID above to enable IEEE Member pricing.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="mt-8 p-6 bg-purple-900/20 rounded-xl border border-purple-500/30">
                    <h3 className="text-xl font-bold mb-4 text-purple-200">Terms & Conditions</h3>
                    <div className="text-sm text-purple-100 space-y-2 max-h-40 overflow-y-auto mb-4">
                      <p>• Registration fees are non-refundable and non-transferable.</p>
                      <p>• Participants must carry a valid college ID during the event.</p>
                      <p>• Participants are responsible for their own belongings during the event.</p>
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
                      ₹{PRICING[formData.registrationType]}
                    </p>
                    <p className="text-center text-purple-200 mt-2">
                      {getRegistrationTypeLabel(formData.registrationType)}
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
                      Pay ₹{PRICING[formData.registrationType]} with UPI (Mobile)
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
                       <img
                        src={getQRCodeUrl()}
                        alt="Payment QR Code"
                        width={300}
                        height={300}
                        className="w-64 h-64 mx-auto"
                      />

                        <p className="text-black text-sm mt-4 font-medium">
                          Scan with any UPI app to pay ₹{PRICING[formData.registrationType]}
                        </p>
                        <p className="text-gray-600 text-xs mt-2">
                          {UPI_ID}
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