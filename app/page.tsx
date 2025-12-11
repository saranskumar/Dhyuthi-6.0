import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import About from "@/components/About";
import Hero from "@/components/Hero";
// CertificateFinder import removed as we use a CTA now
import Event from "@/components/Event";
{/* import { Timer } from "@/components/Timer"; */ }
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import PreEvents from "@/components/PreEvents";
import Faqs from "@/components/Faqs";
import Tracks from "../components/Tracks";

export default function Home() {
  return (
    <div>

      <Hero />

      {/* Certificate CTA */}
      <div className="flex justify-center mt-10 mb-20 relative z-20 px-4">
        <Link href="/certificates">
          <div className="group relative">
            <button className="relative px-8 py-4 bg-black rounded-2xl leading-none flex items-center gap-3 divide-x divide-gray-600 border border-white/10 hover:bg-white/5 transition-colors">
              <span className="flex items-center gap-3 text-gray-100 pr-3">
                <Award className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-lg">Get Your Certificates</span>
              </span>
              <span className="pl-3 text-indigo-400 group-hover:text-gray-100 transition duration-200">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </Link>
      </div>

      {/*<Timer/>*/}
      <About />
      <PreEvents />
      <Tracks />
      <Event />
      <Gallery />
      <Faqs />
      <Venue />
    </div>
  );
}