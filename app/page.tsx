import About from "@/components/About";

import { Timer } from "@/components/Timer";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import Faqs from "@/components/Faqs";

export default function Home() {
  return (
    <div>
      <Timer />
   
      <About />
     
      <Gallery />
      <Faqs />
      <Venue />
    </div>
  );
}
