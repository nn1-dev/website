import Profile from "./Profile";

export default function Organisers() {
  return (
    <div className="relative isolate bg-zinc-900 py-24 overflow-hidden border-b border-zinc-800">
      <div
        className="absolute right-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        aria-hidden="true"
      >
        <div
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#fed7aa] to-[#18181b] opacity-20"
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Organisers
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 text-zinc-100">
          <Profile
            name="Pawel Grzybek"
            role="Software Engineer"
            bio="Software developer from Poland living in Northampton. Web standards, accessibility and performance enthusiast. Recently, Rust lover. After hours, keen funky records listener and collector."
            image="/pawel.jpg"
            urlWebsite="https://pawelgrzybek.com"
            urlLinkedIn="https://www.linkedin.com/in/pgrzybek/"
            urlGitHub="https://github.com/pawelgrzybek"
            urlMastodon="https://mastodon.social/@pawelgrzybek"
          />
          <Profile
            name="Darren Sharp"
            role="Chief Executive Officer at S-SA Digital"
            bio="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            image="/darren.jpg"
            urlLinkedIn="https://www.linkedin.com/in/staffordsharp/"
          />
        </div>
      </div>
    </div>
  );
}
