import Profile from "./Profile";

export default function Organisers() {
  return (
    <div className="bg-zinc-900 py-24 md:py-32">
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
            bio="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
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
