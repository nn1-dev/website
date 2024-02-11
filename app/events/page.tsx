import type { Metadata } from "next";
import Events from "@/components/Events";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Northamptonshire Dev Meetup",
  description: "Northamptonshire Dev Meetup",
};

export default function HomePage() {
  return (
    <>
      <Events />
      <Footer />
    </>
  );
}
