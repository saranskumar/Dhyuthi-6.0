import About from "@/components/About";
import Hero from "@/components/Hero";
import Event from "@/components/Event";
import { Timer } from "@/components/Timer";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import Faqs from "@/components/Faqs";
import Tracks from "../components/Tracks";

export default function Home() {
  return (
    <div>
      <Timer />
      <Hero/>
      <About />
      <Tracks />
      <Event />
      <Gallery />
      <Faqs />
      <Venue />
    </div>
  );
}
