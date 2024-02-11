import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import Organisers from "@/components/Organisers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Northamptonshire Dev Meetup",
  description: "Northamptonshire Dev Meetup",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Events />
      <Organisers />
      <Footer />
    </>
  );
}
