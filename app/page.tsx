import Hero from "@/components/Hero";
import Event from "@/components/Event";
import Organisers from "@/components/Organisers";
import events from "../public/events.json";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="bg-zinc-950 py-24 border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Event {...events[0]} />
        </div>
      </div>

      <Organisers />
    </>
  );
}
