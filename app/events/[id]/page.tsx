import Event from "@/components/Event";
import Organisers from "@/components/Organisers";
import events from "../../../public/events.json";

export default function SingleEventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = events.find((event) => event.id === Number(params.id));
  return (
    <>
      <div className="bg-zinc-950 py-24 border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Event {...event!} />
        </div>
      </div>

      <Organisers />
    </>
  );
}
