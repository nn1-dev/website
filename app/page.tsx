import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import Organisers from "@/components/Organisers";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-white">
      <Nav />
      <Hero />
      <Events />
      <Organisers />
      <Footer />
    </div>
  );
}
