import About from "@/components/About";
import Hero from "@/components/Hero";
import Event from "@/components/Event";
import { Timer } from "@/components/Timer";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import PreEvents from "@/components/PreEvents";
import Faqs from "@/components/Faqs";
import Tracks from "../components/Tracks";

export default function Home() {
  return (
    <div>
      
      <Hero />
      <About />
      <Timer />
      <PreEvents/>
      <Tracks />
      <Event />
      <Gallery />
      <Faqs />
      <Venue />
    </div>
  );
}