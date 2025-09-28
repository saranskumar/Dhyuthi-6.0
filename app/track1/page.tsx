"use client";

import Image from "next/image";
import { useState, useEffect } from "react";


export default function TrackPage() {
  
  const [showRegistration, setShowRegistration] = useState(false);
  
  // Carousel posters for pre-events
  const posters = ["/1.jpg", "/2.jpg", "/3.jpg"];
  const links = [
    "https://tinyurl.com/DoodleQuest1",
    "https://bit.ly/trail_Quest",
    "https://tinyurl.com/StrikezoneDhyuthi",
  ];
  const [current, setCurrent] = useState(0);

  // Registration form state
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeader: "",
    leaderEmail: "",
    leaderPhone: "",
    leaderCollege: "",
    member2Name: "",
    member2Email: "",
    member2Phone: "",
    member3Name: "",
    member3Email: "",
    member3Phone: "",
    projectTitle: "",
    projectDescription: "",
    techStack: "",
    track: "AI & ML Track", // Default track
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [posters.length]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + posters.length) % posters.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % posters.length);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Simulate API call - replace with actual registration endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send data to your backend
      console.log("Form submitted:", formData);
      
      setSubmitStatus("success");
      setTimeout(() => {
        setShowRegistration(false);
        setSubmitStatus("");
      }, 3000);
      
    } catch (error) {
      setSubmitStatus("error");
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Track Registration
              </h1>
              <button
                onClick={() => setShowRegistration(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Information */}
              <div className="bg-purple-900/20 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">Team Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                      placeholder="Enter your team name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Track Selection *
                    </label>
                    <select
                      name="track"
                      value={formData.track}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    >
                      <option value="AI & ML Track">AI & ML Track</option>
                      <option value="Web Development Track">Web Development Track</option>
                      <option value="Robotics Track">Robotics Track</option>
                      <option value="IoT Track">IoT Track</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Team Leader Information */}
              <div className="bg-blue-900/20 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">Team Leader Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="teamLeader"
                      value={formData.teamLeader}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      placeholder="Team leader's full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="leaderEmail"
                      value={formData.leaderEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      placeholder="leader@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="leaderPhone"
                      value={formData.leaderPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      College/Institution *
                    </label>
                    <input
                      type="text"
                      name="leaderCollege"
                      value={formData.leaderCollege}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      placeholder="Your college or institution"
                    />
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-indigo-900/20 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Team Members (Optional)</h2>
                <p className="text-gray-400 mb-4">You can register with 1-3 members per team.</p>
                
                {/* Member 2 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-indigo-300 mb-3">Member 2</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="member2Name"
                      value={formData.member2Name}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                      placeholder="Full Name"
                    />
                    <input
                      type="email"
                      name="member2Email"
                      value={formData.member2Email}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                      placeholder="Email Address"
                    />
                    <input
                      type="tel"
                      name="member2Phone"
                      value={formData.member2Phone}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                {/* Member 3 */}
                <div>
                  <h3 className="text-lg font-medium text-indigo-300 mb-3">Member 3</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="member3Name"
                      value={formData.member3Name}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                      placeholder="Full Name"
                    />
                    <input
                      type="email"
                      name="member3Email"
                      value={formData.member3Email}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                      placeholder="Email Address"
                    />
                    <input
                      type="tel"
                      name="member3Phone"
                      value={formData.member3Phone}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div className="bg-green-900/20 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-green-400 mb-4">Project Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                      placeholder="Your innovative project title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                      placeholder="Describe your project idea, its purpose, and expected impact..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Technology Stack *
                    </label>
                    <input
                      type="text"
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                      placeholder="e.g., React, Python, TensorFlow, Arduino..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Registering...
                    </div>
                  ) : (
                    "Register Team"
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="text-center p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 font-semibold">✅ Registration Successful!</p>
                  <p className="text-gray-300">You will receive a confirmation email shortly.</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="text-center p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 font-semibold">❌ Registration Failed</p>
                  <p className="text-gray-300">Please try again or contact support.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Dhyuthi 6.0
          </h1>
          <p className="text-xl text-gray-300">Innovation Track Challenge</p>
        </div>

        {/* Track Poster + Register */}
        <section className="text-center my-12">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 mb-8">
            <Image
              src="/track1-poster.jpg"
              alt="Track 1 Poster"
              width={600}
              height={400}
              className="mx-auto rounded-lg shadow-2xl mb-6"
            />
            <button
              onClick={() => setShowRegistration(true)}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-bold text-lg py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Register Now
            </button>
          </div>
        </section>

        {/* Speaker Info */}
        <section className="my-12 bg-black/30 backdrop-blur-md rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <Image
              src="/speakers/saran.jpg"
              alt="Saran S Kumar"
              width={150}
              height={150}
              className="rounded-full shadow-lg"
            />
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Saran S Kumar</h2>
              <p className="text-xl text-purple-400 mb-3">IEEE Xtreme 19.0 Campus Ambassador</p>
              <p className="text-gray-300 leading-relaxed">
                Expert in competitive programming and technology innovation. Guiding students 
                towards excellence in IEEE competitions and technical challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Event Brief */}
        <section className="my-12 bg-black/30 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Event Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-3">🚀 Innovation Challenge</h3>
              <p className="text-gray-300 leading-relaxed">
                This track challenges participants to build innovative solutions using AI & ML, 
                robotics, and web technologies. Perfect for students looking to test their skills 
                in a competitive environment while solving real-world problems.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">🏆 Competition Focus</h3>
              <p className="text-gray-300 leading-relaxed">
                Showcase your technical prowess, creativity, and problem-solving abilities. 
                Build projects that demonstrate innovation, technical excellence, and practical impact 
                in your chosen domain.
              </p>
            </div>
          </div>
        </section>

        {/* Guidelines */}
        <section className="my-12 bg-black/30 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Competition Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">📋 Registration Rules</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><span className="text-green-400 mr-2">•</span>Teams of 1-3 participants</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">•</span>Open to all students</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">•</span>One team per leader</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">•</span>Valid student ID required</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">⚡ Technical Requirements</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span>Original code and concepts</li>
                <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span>Any technology stack allowed</li>
                <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span>Follow IEEE ethics guidelines</li>
                <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span>Working prototype required</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-red-400 mb-3">📅 Important Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
              <div className="text-center">
                <p className="font-semibold text-red-400">Registration Deadline</p>
                <p>September 30, 2024</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-red-400">Project Submission</p>
                <p>October 15, 2024</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-red-400">Final Presentation</p>
                <p>October 20, 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Events Carousel */}
        <section className="my-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Pre-Events
          </h2>
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Carousel */}
              <div className="relative w-full lg:w-1/2 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                {posters.map((poster, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-700 ${
                      i === current ? "opacity-100 z-20 scale-100" : "opacity-0 z-10 scale-105"
                    }`}
                  >
                    <a href={links[i]} target="_blank" rel="noopener noreferrer">
                      <Image 
                        src={poster} 
                        alt={`Pre-event ${i + 1}`} 
                        fill 
                        style={{ objectFit: "cover" }}
                        className="hover:scale-110 transition-transform duration-500" 
                      />
                    </a>
                  </div>
                ))}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-30 transition-all duration-300 hover:scale-110"
                >
                  &#10094;
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-30 transition-all duration-300 hover:scale-110"
                >
                  &#10095;
                </button>
                
                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                  {posters.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === current ? "bg-white scale-125" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 text-gray-300">
                <h3 className="text-2xl font-semibold text-purple-400 mb-4">Build-Up to The Main Event</h3>
                <h4 className="text-3xl font-bold mb-6 text-white">Dhyuthi 6.0 Pre-Events</h4>
                <p className="leading-relaxed text-lg mb-6">
                  Pre-events are a series of exciting competitions designed to ignite creativity, 
                  innovation, and collaboration among students. These events serve as warm-ups to 
                  the main competition, allowing participants to showcase their skills, network with 
                  peers, and win exciting prizes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-purple-400">
                    <span className="mr-2">🎯</span>
                    <span>Skill-building workshops</span>
                  </div>
                  <div className="flex items-center text-blue-400">
                    <span className="mr-2">🏅</span>
                    <span>Exciting prizes and goodies</span>
                  </div>
                  <div className="flex items-center text-indigo-400">
                    <span className="mr-2">🤝</span>
                    <span>Networking opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center my-16">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Innovate?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join Dhyuthi 6.0 and be part of the most exciting tech competition of the year!
            </p>
            <button
              onClick={() => setShowRegistration(true)}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-bold text-xl py-5 px-16 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Register Your Team Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}